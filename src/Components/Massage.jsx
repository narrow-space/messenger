import React, { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { ChatContext } from "./Context/ChatContext";

const Massage = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef()

 useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
 },[message]);
 
  return (
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser?.photoURL
              : data.user?.photoURL
          }
          alt=""
        />
        <span>Just Now</span>
      </div>
      <div
      className="messageContent">
        <p>{message.text}</p>
       {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Massage;