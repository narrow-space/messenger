import React from 'react';
import { FcCompactCamera } from "react-icons/fc";
import { FaUserPlus } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import Messages from './Messages';
import Input from './Input';
import { useContext } from 'react';
import { ChatContext } from './Context/ChatContext';


const Chat = () => {
const {data}=useContext(ChatContext)
console.log(data);

    return (
        <div className='chat'>
        <div className="chatInfo">
            <span>{data.user.displayName}</span>
            <div className="chatIcon">
            <FcCompactCamera size={30}/>
            <FaUserPlus  size={30}/>
            <FiMoreHorizontal  size={30}/>
            </div>
        </div>
        <Messages/>
        <Input/>
        </div>
    );
};

export default Chat;