import React, { useEffect, useState, useRef } from "react";
import "../styles/Chat.css";

import { useParams } from "react-router-dom";
import { io } from "socket.io-client"; 
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Nav"

function Chat() {
  const { id } = useParams();
  const chatEndRef = useRef(null);
  const navigate = useNavigate()

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [receiver, setReceiver] = useState({});
  const socket = io("http://localhost:3015/");

  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const[deleteLoading,setDeleteLoading]=useState(false)

  const [user, setUser] = useState("loading");



  useEffect(() => {

    socket.on("messageDeleted", ({ messageId }) => {

        setChat((prev) =>
            prev.filter((message) => message._id !== messageId)
        );

    });

    return () => {
        socket.off("messageDeleted");
    };

}, []);




  useEffect(() => {
    getMessages();
    oneUser();

    const userId = localStorage.getItem("id");

    socket.emit("userConnected", userId);

    socket.on("receiveMessage", (data) => {
      console.log(data);
      console.log("RECEIVED DATA:", data);
      console.log("MESSAGE:", data.messages);
      console.log("DATE:", data.createdAt);

      const newMessage = {
        sender: data.senderId,
        receiver: data.receiverId,
        message: data.messages,
        createdAt: data.createdAt,
      };

      setChat((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat]);

  async function sendMessages(e) {
    e.preventDefault();

    const senderId = localStorage.getItem("id");
    const receiverId = id;
    const messages = message;

    const dataMessages = {
      senderId: senderId,
      receiverId: receiverId,
      messages: message,
      createdAt: new Date(),
    };
    socket.emit("sendMessage", dataMessages);

    const response = await fetch("https://route66-backend-1-v5us.onrender.com/chats/chat", {
      method: "POSt",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataMessages),
    });

    const data = await response.json();
    if (response.ok) {
      getMessages();
      setMessage("");
      console.log(dataMessages);
    }
  }

  async function getMessages() {
    try {
      const senderId = localStorage.getItem("id");
      const receiverId = id;

      const response = await fetch(
        `https://route66-backend-1-v5us.onrender.com/chats/getChat?senderId=${senderId}&receiverId=${receiverId}`,
      );

      const data = await response.json();

      if (response.ok) {
        setChat(data.message);
        console.log(data.message);
      }
      if (!response.ok) {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async function deleteChat(uid) {
    try {

   


      setDeleteLoading(true)
         const userId = localStorage.getItem("id")



      const response = await fetch(
        `https://route66-backend-1-v5us.onrender.com/chats/deleteChat/${uid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        
        getMessages();
        setShowDeleteMenu(false)
        setSelectedMessage(null);


        socket.emit("deleteMessage",{
          messageId :uid,
          senderId:userId,
          receiverId:id




        })


















      }
    } catch (err) {
      console.log(err.message);
    }
    finally{
      setDeleteLoading(false)
    }
  }

  async function oneUser() {
    try {
      const response = await fetch(
        `https://route66-backend-1-v5us.onrender.com/user/getOneUser/${id}`,
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setUser(data.oneUser);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  console.log(user);

  if (!user) {
    return (<></>)
  }

  return (
    <>
      <Navbar />

      <div className="route66-chat-page">
        {" "}
        <main className="chat-container">
          {" "}
          {/* HEADER */}{" "}
          <div className="chat-header">
            {" "}
            <div className="chat-header-left">
              {" "}
              <button className="chat-back-button"onClick={()=>navigate('/chats')}>
                {" "}
                <i   className="bi bi-arrow-left"></i>{" "}
              </button>{" "}
              <div className="chat-user-avatar">{user?.name?.charAt(0)?.toUpperCase()}</div>{" "}
              <div className="chat-user-details">
                {" "}
                <h3>{user.name}</h3>{" "}
                <p>
                  {" "}
                  <span className="chat-online-dot"></span> Online{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="chat-header-actions"> </div>{" "}
          </div>{" "}
          {/* MESSAGES */}{" "}
          <div className="chat-message-area">
            {" "}
            {chat.length === 0 ? (
              <div className="chat-empty">
                {" "}
                <div className="chat-empty-icon">
                  {" "}
                  <i className="bi bi-chat-dots"></i>{" "}
                </div>{" "}
                <h3>No messages yet</h3>{" "}
                <p> Start the conversation by sending a message. </p>{" "}
              </div>
            ) : (
              chat.map((item, index) => {
                const isSender =
                  String(item.sender) === localStorage.getItem("id");
                return (
                  <div
                    key={index}
                    className={
                      isSender
                        ? "chat-message chat-message-sent"
                        : "chat-message chat-message-received"
                    }
                  >
                    {" "}
                    <div
                    
                      onDoubleClick={() =>{
                        if(isSender){
                        
                        
                        setShowDeleteMenu(true);setSelectedMessage(item._id)}
                      
                        }
                      
                      }
                      className="chat-message-content"
                    >
                      {" "}
                      <p>{item.message}</p>{" "}
                      <span>
                        {" "}
                        {new Date(item.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                      </span>{" "}
                    </div>{" "}
                  </div>
                );
              })
            )}{" "}
          </div>{" "}
          {/* INPUT */}{" "}
          <form className="chat-input-area" onSubmit={sendMessages}>
            {" "}
        
            <div className="chat-input-wrapper">
              {" "}
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />{" "}
              
            </div>{" "}
            <button type="submit" className="chat-send-button">
              {" "}
              <i className="bi bi-send-fill"></i>{" "}
            </button>{" "}
          </form>{" "}
        </main>{" "}
      </div>

      {showDeleteMenu ? (
        <div
          className="chat-delete-overlay"
          onClick={() => {
            setShowDeleteMenu(false);
            
          }}
        >
          <div
            className="chat-delete-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="chat-delete-preview">
               <p> are you confirm want to delete the message</p>
            </div>

            <button
              type="button"
              className="chat-delete-button"
              onClick={()=>deleteChat(selectedMessage)}
            >
              <i className="bi bi-trash3"></i>
              {deleteLoading? "deleting...":"delete"}
            </button>
          </div>
        </div>
      ) : (
        <p></p>
      )}

      <div ref={chatEndRef}></div>
    </>
  );
}

export default Chat;
