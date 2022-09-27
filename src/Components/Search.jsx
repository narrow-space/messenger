import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import { AuthContext } from "./Context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);


  
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleselect = async (user) => {
    ////check wheter the group in chats exists or not;
    ///create user chats//
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combineId));
      if (!res.exists()) {
        ///create chat  in chat collections
        await setDoc(doc(db, "chats", combineId), { messages: [] });
        //// create user chats//
        await updateDoc(doc(db, "usersChats", currentUser.uid), {
          [combineId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "usersChats", user.uid), {
          [combineId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
        setUsername("")
        setUser(null)
      }
    } catch (error) {}
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
        value={username}
          onKeyDown={handleKey}
          type="text"
          name=""
          id=""
          placeholder="search a user"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {error && <span>user not found</span>}
      {user && (
        <div className="userchat" onClick={()=>handleselect(user)}>
          <img src={user.photoURL} alt="" />
          <div className="userchatinfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
