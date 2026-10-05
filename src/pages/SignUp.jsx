import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/SignUp.css'
import logo from "../images/logo.svg";

function SignUp() {
    const navigate = useNavigate();
      useEffect(()=>{
        const gateway = localStorage.getItem("gateway")
    
        if(gateway==="true"){
          navigate("/home")
        }
    
      },[])
    

   


    return (
        <main className="route66-signup-page">
            <div className="signup-ambient signup-ambient-one"></div>
            <div className="signup-ambient signup-ambient-two"></div>
            <div className="signup-background-grid"></div>

            <section className="signup-container">

                <div className="signup-visual">

                    <div className="signup-road-line signup-road-line-one"></div>
                    <div className="signup-road-line signup-road-line-two"></div>

                    <div className="signup-visual-content">

                        <span className="signup-eyebrow">
                            THE NEW WAY TO CONNECT
                        </span>

                        <h1>
                            ROUTE<span>66</span>
                        </h1>

                        <div className="signup-gold-divider"></div>

                        <p>
                            One route.
                            <br />
                            Countless connections.
                        </p>

                        <div className="signup-route-badge">
                            <span className="signup-status-dot"></span>
                            REAL-TIME COMMUNITY
                        </div>

                    </div>
                </div>


                <div className="signup-welcome-section">

                    <div className="signup-welcome-card">

                        <div className="signup-card-label">
                            <span></span>
                            WELCOME TO ROUTE66
                        </div>


                        <div className="signup-brand-logo">

                            <div className="signup-logo-ring"></div>

                            <img
                                src={logo}
                                alt="Route66"
                            />

                        </div>


                        <h2>
                            Connect.
                            <br />
                            <span>Chat.</span>
                            <br />
                            Belong.
                        </h2>


                        <p className="signup-description">
                            Your people, your conversations,
                            your community — all in one place.
                        </p>


                        <Link
                            to="/login"
                            className="signup-login-button"
                        >
                            <span>Enter Route66</span>

                            <i className="bi bi-arrow-up-right"></i>
                        </Link>


                        <div className="signup-bottom-info">

                            <span>SECURE</span>

                            <span className="signup-info-dot"></span>

                            <span>PRIVATE</span>

                            <span className="signup-info-dot"></span>

                            <span>REAL-TIME</span>

                        </div>

                    </div>

                </div>

            </section>


            <footer className="signup-footer">
                ROUTE66
                <span>•</span>
                CONNECT WITHOUT LIMITS
            </footer>

        </main>
    );
}

export default SignUp;