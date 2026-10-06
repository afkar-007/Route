
import React from "react";
import "../styles/Home.css";
import Navbar from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {

       useEffect(()=>{
        const gateway = localStorage.getItem("gateway")
    
        if(gateway !== "true"){
          navigate("/")
        }
    
      },[])





    const navigate = useNavigate()
    return (
      <>
      <Navbar/>

        <main className="route66-home">

            {/* HERO SECTION */}
            <section className="home-hero">

                <div className="home-hero-content">

                    <span className="home-eyebrow">
                        <i className="bi bi-circle-fill"></i>
                        ROUTE66 COMMUNITY
                    </span>

                    <h1>
                        CONNECT.
                        <br />
                        <span>CHAT.</span>
                        <br />
                        SHARE.
                    </h1>

                    <p>
                        Your people. Your conversations.
                        <br />
                        Everything connected in one place.
                    </p>

                    <div className="home-actions">

                        <button onClick={()=>navigate("/chats")} className="home-primary-button">
                            <i className="bi bi-chat-dots"></i>
                            Start Chatting
                        </button>

                        <button onClick={()=>navigate("/people")} className="home-secondary-button">
                            <i className="bi bi-people"></i>
                            Find People
                        </button>

                    </div>

                </div>


               
                

            </section>


            {/* QUICK STATS */}
            <section className="home-stats">

                <div onClick={()=>navigate("/chats")} className="home-stat">
                    <i className="bi bi-chat-square-text"></i>

                    <div >
                        <strong  >Chats</strong>
                        <span>Start conversations</span>
                    </div>
                </div>

                <div onClick={()=>navigate("/people")} className="home-stat">
                    <i className="bi bi-people"></i>

                    <div >
                        <strong>People</strong>
                        <span>Connect with others</span>
                    </div>
                </div>



                <div  onClick={()=>navigate("/profile")} className="home-stat" >
                     <i className="bi bi-person"></i>

                    <div>
                        <strong>profile</strong>
                        <span>see your profile</span>
                    </div>
                </div>

                <div  onClick={()=>navigate("/About")} className="home-stat" >
                     <i className="bi bi-book-half"></i>

                    <div>
                        <strong>About</strong>
                        <span>About Route 66</span>
                    </div>
                </div>

            </section>

        </main>
        </>
    );
}

export default Home;
