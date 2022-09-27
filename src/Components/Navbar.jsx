import React, { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
import {  signOut } from "firebase/auth";
import { auth } from '../Firebase';

const Navbar = () => {
    const {currentUser}=useContext(AuthContext)
    

    return (
        <div className='navbar'>
            <span className="logo">
                imran Chat
            </span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>Logout</button>
            </div>
            
        </div>
    );
};

export default Navbar;