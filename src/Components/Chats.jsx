import React from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../Firebase";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { useState } from "react";
import { ChatContext } from "./Context/ChatContext";


const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);


  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "usersChats", currentUser.uid),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  console.log(chats);
   
   const handleselect =(u)=>{
     dispatch({type:"CHANGE_USER",payload:u})
     console.log(u);
   }


  return (
    <div className="chats">
      {Object.entries(chats).sort((a,b)=>b[1].date- a[1].date).map((chat) => (
        <div
          onClick={() => handleselect(chat[1].userInfo)}
          className="userchat"
          key={chat[0]}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userchatinfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
