import User from "../models/User.js";

// READ OPEARTION
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Error in Getting User",
    });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = await friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Error in Getting User's Friends",
    });
  }
};

// UPADTE OPERATION
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(friendId);
    }

    await user.save();
    await friend.save();

     const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = await friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Error in adding/removing Friends",
    });
  }
};
