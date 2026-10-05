
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "../styles/Navbar.css";
import logo from "../images/logo.svg";


const navItems = [
    {
        path: "/home",
        label: "Home",
        icon: "bi-house"
    },
    {
        path: "/chats",
        label: "Chats",
        icon: "bi-chat-dots"
    },
    {
        path: "/people",
        label: "People",
        icon: "bi-people"
    },
   
];


function Navbar() {
    useEffect(()=>{
        NavOneUser()
        


    },
[])




    const [user,setUser]=useState("...")

    const navigate = useNavigate()
    const location = useLocation();

    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);


    /* ==============================
       ACTIVE NAVIGATION
    ============================== */

    const isActive = (path) => {
        return location.pathname === path;
    };


    /* ==============================
       LOGOUT
    ============================== */

    const handleLogout = (e) => {

        e.preventDefault();

        localStorage.removeItem("gateway");
        localStorage.removeItem("token");
        localStorage.removeItem("id");

        setProfileOpen(false);
        setMobileOpen(false);

        navigate("/");
    };


    /* ==============================
       NAVIGATION
    ============================== */

    const handleNavigation = (path) => {

        navigate(path);

        setMobileOpen(false);
        setProfileOpen(false);
    };


      async function NavOneUser() {
        
      try {
        const id = localStorage.getItem("id")



        const response = await fetch(
          `http://localhost:3015/user/getOneUser/${id}`,
        );

        const data = await response.json();

        if (response.ok) {
          console.log(data);
          setUser(data.oneUser)
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    if(!user){
        return( <p>loading</p> )
        
    }



    return (

        <header className="route66-navbar">

            <div className="navbar-container">


                {/* =================================================
                    LOGO
                ================================================= */}

                <Link
                    to="/home"
                    className="navbar-logo"
                    onClick={() => {
                        setMobileOpen(false);
                        setProfileOpen(false);
                    }}
                >

                    <div className="navbar-logo-image">

                        <img
                            src={logo}
                            alt="Route66"
                        />

                    </div>


                    <div className="navbar-logo-text">

                        <h3>
                            ROUTE<span>66</span>
                        </h3>

                        <p>
                            CONNECT WITHOUT LIMITS
                        </p>

                    </div>

                </Link>


                {/* =================================================
                    DESKTOP NAVIGATION
                ================================================= */}

                <nav className="navbar-navigation">

                    {navItems.map((item) => (

                        <Link
                            key={item.path}
                            to={item.path}
                            className={
                                isActive(item.path)
                                    ? "navbar-link navbar-link-active"
                                    : "navbar-link"
                            }
                        >

                            <i
                                className={`bi ${item.icon}`}
                            ></i>

                            <span>
                                {item.label}
                            </span>

                        </Link>

                    ))}

                </nav>


                {/* =================================================
                    RIGHT SIDE
                ================================================= */}

                <div className="navbar-right">


                    {/* ==============================
                        NEW CHAT
                    ============================== */}



                    {/* ==============================
                        NOTIFICATION
                    ============================== */}

                    

                      


                    {/* ==============================
                        PROFILE
                    ============================== */}

                    <div className="navbar-profile-wrapper">

                        <button
                            type="button"
                            className="navbar-profile-button"
                            onClick={() =>
                                setProfileOpen(!profileOpen)
                            }
                        >

                            <span className="navbar-avatar">

                                

                                <span className="navbar-online">{user?.name?.charAt(0)?.toUpperCase()}</span>

                            </span>


                            <span className="navbar-profile-name">
                               {user.name}
                            </span>


                            <i className="bi bi-chevron-down"></i>

                        </button>


                        {/* ==============================
                            PROFILE MENU
                        ============================== */}

                        {profileOpen && (

                            <div className="navbar-profile-menu">


                                {/* PROFILE HEADER */}

                                <div className="navbar-profile-header">

                                    <div className="navbar-menu-avatar">
                                        <i classname="bi bi-person-circle"></i>
                                    </div>


                                    <div>

                                        <strong>
                                            {user?.name?.toUpperCase()}
                                        </strong>

                                        <span>
                                            {user.email}
                                            
                                        </span>

                                    </div>

                                </div>


                                <div className="navbar-menu-line"></div>


                                {/* PROFILE */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleNavigation("/profile")
                                    }
                                >

                                    <i className="bi bi-person"></i>

                                    <span>
                                        Profile
                                    </span>

                                </button>


                                {/* SETTINGS */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleNavigation("/About")
                                    }
                                >

                                    <i className="bi bi-book-half"></i>

                                    <span>
                                        About
                                    </span>

                                </button>


                                <div className="navbar-menu-line"></div>


                                {/* LOGOUT */}

                                <button
                                    type="button"
                                    className="navbar-logout"
                                    onClick={handleLogout}
                                >

                                    <i className="bi bi-box-arrow-right"></i>

                                    <span>
                                        Sign out
                                    </span>

                                </button>

                            </div>

                        )}

                    </div>


                    {/* =================================================
                        MOBILE MENU BUTTON
                    ================================================= */}

                    <button
                        type="button"
                        className="navbar-mobile-button"
                        onClick={() =>
                            setMobileOpen(!mobileOpen)
                        }
                        aria-label="Toggle navigation menu"
                    >

                        <i
                            className={
                                mobileOpen
                                    ? "bi bi-x-lg"
                                    : "bi bi-list"
                            }
                        ></i>

                    </button>

                </div>

            </div>


            {/* =================================================
                MOBILE NAVIGATION
            ================================================= */}

            {mobileOpen && (

                <div className="navbar-mobile-menu">


                    {/* MOBILE NAV ITEMS */}

                    {navItems.map((item) => (

                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => {
                                setMobileOpen(false);
                                setProfileOpen(false);
                            }}
                            className={
                                isActive(item.path)
                                    ? "navbar-mobile-link navbar-mobile-link-active"
                                    : "navbar-mobile-link"
                            }
                        >

                            <i
                                className={`bi ${item.icon}`}
                            ></i>

                            <span>
                                {item.label}
                            </span>

                        </Link>

                    ))}


                    {/* MOBILE NEW CHAT */}

                    <button
                        type="button"
                        className="navbar-mobile-chat"
                        onClick={() =>
                            handleNavigation("/chats")
                        }
                    >

                        <i className="bi bi-plus-lg"></i>

                        New Chat

                    </button>

                </div>

            )}

        </header>

    );
}


export default Navbar;
