import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/People.css";
import Navbar from "../components/navbar";
function People() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [user,setUser]=useState([])


  useEffect(()=>{
    GetUsers()
  },[search])

    useEffect(()=>{
          const gateway = localStorage.getItem("gateway")
      
          if(gateway !== "true"){
            navigate("/")
          }
      
        },[])

  



  const handleChat = (userId) => {
    navigate(`/chat/${userId}`);
  };




  async function GetUsers() {
    const token = localStorage.getItem("token")

    const response = await fetch(`https://route66-backend-1-v5us.onrender.com/user/peoples?search=${search}`,{
        headers:{
            authorization:token
        }
        })

        const data = await response.json()

        console.log(data);
        
        if(!response.ok)
        {
        return alert(data.message)
        }

        if(response.ok){
            setUser(data.Users)
        }



        
    





    
  }


const id = localStorage.getItem("id")









  return (
    <>
    <Navbar/>


      <main className="route66-people">
        {/* HEADER */}

        <section className="people-header">
          <div>
            <span className="people-eyebrow">
              <i className="bi bi-people-fill"></i>
              ROUTE66 COMMUNITY
            </span>

            <h1>
              Find your
              <span> people.</span>
            </h1>

            <p>Discover people and start meaningful conversations.</p>
          </div>

          <div className="people-count">
            <strong>{user.length-1}</strong>

            <span>People</span>
          </div>
        </section>

        {/* SEARCH */}

        <section className="people-search-section">
          <div className="people-search">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search people..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                className="people-search-clear"
                onClick={() => setSearch("")}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </section>

        {/* PEOPLE LIST */}

        <section className="people-list">
          {user.length > 0 ? (
            user.filter((sends)=>sends._id !==id).map((user) => (
              <article className="person-card" key={user._id}>
                <div className="person-main">
                  {/* AVATAR */}

                  <div className="person-avatar">
                    {user.name.charAt(0).toUpperCase()}

                    <span
                      className={
                        user.online ? "person-online" : "person-offline"
                      }
                    ></span>
                  </div>

                  {/* USER DETAILS */}

                  <div className="person-details">
                    <h3>{user.name}</h3>

                    <span>{user.email}</span>

                    <small
                      className={
                        user.online
                          ? "person-status-online"
                          : "person-status-offline"
                      }
                    >
                      <i className="bi bi-circle-fill"></i>
                      {user.status}
                    </small>
                  </div>
                </div>

                {/* CHAT BUTTON */}

                <button
                  className="person-chat-button"
                  onClick={() => handleChat(user._id)}
                >
                  <span>Chat</span>

                  <i className="bi bi-arrow-up-right"></i>
                </button>
              </article>
            ))
          ) : (
            <div className="people-empty">
              <div className="people-empty-icon">
                <i className="bi bi-person-x"></i>
              </div>

              <h3>No people found</h3>

              <p>Try searching with a different name or username.</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default People;
