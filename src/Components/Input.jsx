
import React, { useContext } from "react";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { CgAttachment } from "react-icons/cg";
import { GiPlayButton } from "react-icons/gi";
import { AuthContext } from "./Context/AuthContext";
import { ChatContext } from "./Context/ChatContext";
import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../Firebase";
import {v4 as  uuid} from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const Input = () => {
  const [text,setText]=useState("")
  const [image,setImage]=useState(null)
  const {currentUser} =useContext(AuthContext)
  
  const {data} =useContext(ChatContext)

  const handlesend=async()=>{
    if(image){
      const storageRef = ref(storage,uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        
      }, 
      (error) => {
      
      }, 
      () => {
       
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          await updateDoc(doc(db,"chats",data.chatId),{
            messages:arrayUnion({
              id:uuid(),
              text,
              senderId:currentUser.uid,
              date:Timestamp.now(),
              img:downloadURL
            })
          });
        });
      }
    );
    }
    else{
      await updateDoc(doc(db,"chats",data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now()
        })
      });
    }

   await updateDoc(doc(db,"usersChats",currentUser.uid),{
    [data.chatId +".lastMessage"]:{
      text
    },
    [data.chatId +".date"]:serverTimestamp()

   })
   await updateDoc(doc(db,"usersChats",data.user.uid),{
    [data.chatId +".lastMessage"]:{
      text
    },
    [data.chatId +".date"]:serverTimestamp()

   })

    setText("")
    setImage(null)
  }
  return (
    <div className="input">
      <input value={text || ''} type="text" name="" id="" placeholder="type something.." onChange={(e)=>setText(e.target.value)} />
      <div className="send">
        <input type="file" id="attachment"  style={{ display: "none" }}  onChange={(e)=>setImage(e.target.files[0])} />
           
        <label htmlFor="attachment">
        <CgAttachment type="file" color="gray" style={{cursor:"pointer"}} size={20} />
        </label>

      

        <input type="file" name="" id="file" style={{ display: "none" }} onChange={(e)=>setImage(e.target.files[0])} />
        <label htmlFor="file">
          <BiImageAdd color="gray" style={{cursor:"pointer"}} size={20} />
        </label>
        <button>
         
          <span>
          
            <GiPlayButton onClick={handlesend} color="gray" style={{cursor:"pointer"}} size={20} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Input;
