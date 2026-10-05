
import React from "react";
import Navbar from "../components/Nav";
import "../styles/About.css";
import { useEffect } from "react";

function About() {

      useEffect(()=>{
            const gateway = localStorage.getItem("gateway")
        
            if(gateway !== "true"){
              navigate("/")
            }
        
          },[])





    return (
        <>
            <Navbar/>
            <div className="route66-about-page">

                <div className="about-container">

                    {/* HERO */}

                    <section className="about-hero">

                        <div className="about-logo">
                            <i className="bi bi-chat-heart-fill"></i>
                        </div>

                        <p className="about-label">
                            ABOUT ROUTE 66
                        </p>

                        <h1>
                            Connect. Chat. <span>Share.</span>
                        </h1>

                        <p className="about-description">
                            Route 66 is a modern social communication platform
                            designed to make connecting with people simple,
                            fast, and enjoyable.
                        </p>

                    </section>


                    {/* FEATURES */}

                    <section className="about-features">

                        <div className="about-feature-card">

                            <div className="about-feature-icon">
                                <i className="bi bi-people-fill"></i>
                            </div>

                            <h3>
                                Connect
                            </h3>

                            <p>
                                Discover people and build meaningful
                                connections with ease.
                            </p>

                        </div>


                        <div className="about-feature-card">

                            <div className="about-feature-icon">
                                <i className="bi bi-chat-dots-fill"></i>
                            </div>

                            <h3>
                                Chat
                            </h3>

                            <p>
                                Send messages and stay connected through
                                real-time conversations.
                            </p>

                        </div>


                        <div className="about-feature-card">

                            <div className="about-feature-icon">
                                <i className="bi bi-lightning-charge-fill"></i>
                            </div>

                            <h3>
                                Real-Time
                            </h3>

                            <p>
                                Experience fast communication powered by
                                real-time technology.
                            </p>

                        </div>

                    </section>


                    {/* TECHNOLOGY */}

                    <section className="about-tech">

                        <p className="about-label">
                            BUILT WITH
                        </p>

                        <h2>
                            Modern MERN Stack
                        </h2>

                        <p>
                            Route 66 is built using modern web technologies
                            to provide a smooth and responsive experience.
                        </p>


                        <div className="tech-list">

                            <span>
                                <i className="bi bi-filetype-jsx"></i>
                                React
                            </span>

                            <span>
                                <i className="bi bi-node-plus"></i>
                                Node.js
                            </span>

                            <span>
                                <i className="bi bi-server"></i>
                                Express
                            </span>

                            <span>
                                <i className="bi bi-database"></i>
                                MongoDB
                            </span>

                            <span>
                                <i className="bi bi-broadcast"></i>
                                Socket.IO
                            </span>

                        </div>

                    </section>


                    {/* FOOTER */}

                    <section className="about-footer">

                        <div className="about-footer-line"></div>

                        <p>
                            Built with passion for better connections.
                        </p>

                        <span>
                            © 2026 Route 66
                        </span>

                    </section>

                </div>

            </div>
        </>
    );
}

export default About;

