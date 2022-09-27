import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handlesubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
    } catch (error) {}

    navigate("/");
  };

  return (
    <>
      {loading ? (
        <div
        className="spiner"
          
        >
          <div >
            <ClipLoader color="#36d7b7" />
          </div>
        </div>
      ) : (
        <div className="form-container">
          <div className="form-wrapper">
            <span className="chat-logo">Imran Chat</span>
            <span className="logo">Login</span>
            <form onSubmit={handlesubmit}>
              <input type="email" placeholder="Enter your email" />
              <input type="password" placeholder="Enter your password" />

              <button>Login</button>
            </form>
            <p>
              Don't have an account?
              <Link className="link" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
