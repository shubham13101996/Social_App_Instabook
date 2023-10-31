import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage/>} />
          <Route path='/profile/:userId' element={<ProfilePage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
