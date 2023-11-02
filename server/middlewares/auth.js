import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    // console.log(token);
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer")) {
      token = token.slice(7, token?.length).trimLeft();
    }
    // console.log(token, "after");
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Not authorized!!",
    });
  }
};
