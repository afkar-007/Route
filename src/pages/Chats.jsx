import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import "../styles/Chats.css";

function Chats() {

    const navigate = useNavigate();

    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    const id = localStorage.getItem("id")

    console.log(id);
    
    // Fetch existing conversations
    useEffect(() => {
        getChats();
    }, []);


      useEffect(()=>{
            const gateway = localStorage.getItem("gateway")
        
            if(gateway !== "true"){
              navigate("/")
            }
        
          },[])


    const getChats = async () => {

        try {

            // Logged-in user's ID
            const userId = localStorage.getItem("id");


            // Call backend
            const response = await fetch(
                `http://localhost:3015/chats/getChats?userId=${userId}`
            );


            const data = await response.json();


            if (response.ok) {

                // Backend sends { chats }
                setChats(data.Chats || []);
                console.log(data);
                

            } else {

                console.log(data.message);

            }


        } catch (err) {

            console.log(err.message);

        } finally {

            setLoading(false);

        }
    };


    // Open selected chat
    const openChat = (userId) => {

        navigate(`/chat/${userId}`);

    };


    return (
        <>
            <Navbar />

            <div className="route66-chats-page">

                <div className="chats-container">


                    {/* Header */}
                    <div className="chats-header">

                        <div>

                            <h1>Chats</h1>

                            <p>Your conversations</p>

                        </div>


                        <button
                            className="new-chat-button"
                            onClick={() => navigate("/people")}
                        >
                            <i className="bi bi-plus-lg"></i>

                            <span>New Chat</span>

                        </button>

                    </div>


                    {/* Search */}
                


                    {/* Chat List */}
                    <div className="chat-list">


                        {/* Loading */}
                        {loading ? (

                            <div className="chat-status">

                                <i className="bi bi-arrow-repeat"></i>

                                <p>Loading chats...</p>

                            </div>


                        ) : chats.length === 0 ? (

                            /* No chats */
                            <div className="chat-status">

                                <div className="chat-empty-icon">

                                    <i className="bi bi-chat-square-text"></i>

                                </div>

                                <h2>No conversations yet</h2>

                                <p>
                                    Start a conversation from People.
                                </p>


                                <button
                                    onClick={() => navigate("/people")}
                                >

                                    <i className="bi bi-people"></i>

                                    Find People

                                </button>

                            </div>


                        ) : (

                            /* Chats available */
                            chats.filter((sends)=> sends.user._id !== id).map((chat) => (

                                <div
                                    className="chat-list-item"
                                    key={chat.user._id}
                                    onClick={() =>
                                        openChat(chat.user._id)
                                    }
                                >


                                    {/* Avatar */}
                                    <div className="chat-list-avatar">

                                        {chat.user.name
                                            ?.charAt(0)
                                            .toUpperCase()}

                                        <span className="chat-online"></span>

                                    </div>


                                    {/* Chat information */}
                                    <div className="chat-list-info">


                                        {/* Name + Time */}
                                        <div className="chat-list-top">

                                            <h3>
                                                {chat.user.name}
                                            </h3>

                                            <span>
                                                {chat.lastMessageTime}
                                            </span>

                                        </div>


                                        {/* Last message */}
                                        <div className="chat-list-bottom">

                                            <p>
                                                {chat.lastMessage}
                                            </p>


                                            {/* Unread count */}
                                            {chat.unread > 0 && (

                                                <span className="chat-unread">
                                                    {chat.unread}
                                                </span>

                                            )}

                                        </div>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </div>
        </>
    );
}

export default Chats;