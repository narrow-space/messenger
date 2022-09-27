import React, { useState } from "react";
import { FcAddImage } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { HashLoader } from "react-spinners";
const Register = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    // setLoading(true);
       try {
        const res =await createUserWithEmailAndPassword(auth,email,password);
        const storageRef = ref(storage,displayName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
        (snapshot) => {
          
        }, 
        (error) => {
        
        }, 
        () => {
         
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
           await updateProfile(res.user,{
           displayName,
           photoURL:downloadURL
           });
           await setDoc(doc(db,"users",res.user.uid),{
            uid:res.user.uid,
            displayName,
            email,
            photoURL:downloadURL,
           })
           await setDoc(doc(db, "usersChats", res.user.uid), {});

          navigate("/")   
          });
        }
      );
      
       } catch (error) {
        
       }
      }
    
    return (
    <>
      {/* {loading ? (
        <div className="spiner">
          <div>
          <HashLoader size={80} color="#36d7b7" />

          </div>
        </div>
      ) : ( */}
        <div className="form-container">
          <div className="form-wrapper">
            <span className="chat-logo">Imran Chat</span>
            <span className="logo">Register</span>
            <form onSubmit={handlesubmit}>
              <input type="text" placeholder="Enter your name " />
              <input type="email" placeholder="Enter your email" />
              <input type="password" placeholder="Enter your password" />
              <input style={{ display: "none" }} type="file" id="file" />
              <label htmlFor="file">
                <FcAddImage size={30}></FcAddImage>
                <span>Add an Images</span>
              </label>

              {/* {errors && <p>{errors}</p>} */}
              <button>Sign up</button>
            </form>
            <p>
              Do u have an account?
              <Link className="link" to="/login">
                Log in
              </Link>
            </p>
          </div>
        </div>
      {/* )} */}
    </>
  );
};

export default Register;
