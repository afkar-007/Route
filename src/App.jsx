import { useState } from "react";

// ============= import Pages===============

import SignUp   from "./pages/SignUp";
import Login    from "./pages/Login";
import Register from "./pages/Register";
import Home from     "./pages/Home";
import People from "./pages/People";
import Chat from "./pages/Chat";
import Chats from "./pages/Chats";
import Profile from "./pages/Profile";
import About from "./pages/About";

// ============= import Pages===============
import ScrollToTop from "./pages/ScrollToTop";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        

        <Route path="/"         element={<SignUp />}   />
        <Route path="/register" element={<Register />} />
        <Route path="/login"    element={<Login />}    />
        <Route path="/home"     element={<Home />}     />
        <Route path="/people"   element={<People />}   />
        <Route path="/chat/:id"   element={<Chat />}   />
        <Route path="/chats"   element={<Chats />}   />
         <Route path="/profile"   element={<Profile />}   />
         <Route path="/about"   element={<About />}   />
      </Routes>
    </>
  );
}

export default App;
