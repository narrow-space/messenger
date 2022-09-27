import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { db } from "../Firebase";
import { ChatContext } from "./Context/ChatContext";
import Massage from "./Massage";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
      console.log();
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);
  return (
    <div className="massages">
      {messages.map((m) => (
        <Massage message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
