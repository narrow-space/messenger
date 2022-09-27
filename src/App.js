import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "./Pages/Style.scss"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from "./Pages/Home";

import { useContext } from "react";
import { AuthContext } from "./Components/Context/AuthContext";



function App() {
 const {currentUser}=useContext(AuthContext)
console.log(currentUser);

  const ProtectedRoutes=({children})=>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children
  }
  return (
    <div className="">
       <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route index element={<ProtectedRoutes><Home/></ProtectedRoutes>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
