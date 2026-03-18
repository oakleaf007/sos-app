import { useState } from "react";
import "./sign.css";
import { Link } from "react-router-dom";
import { signin } from "../../services/AuthServices";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Signin() {
  const [form, setForm] = useState({
    
    email: "",
    password: ""
  });
  const {login} = useContext(AuthContext);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Sign in Data:", form);

    try{
      const res = await signin(form);
     

      if(res.success){
        login(res);

        setStatus(res.message+ "redirecting...")
        setTimeout(()=>{
          navigate("/");
        },2000);
      }

    }catch(err){
      setStatus(err.message);
      console.error(err.message);
    }


  };

  return (
    <div id="auth-wrapper">
    <div className="auth-container">
      <h2>Sign in</h2>

      <form onSubmit={handleSubmit}>
       

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
    <p>{status}</p>
        <button type="submit">Sign in</button>
      </form>

      <p>
        Already have an account?{" "}
       < Link to="/signup">Sign up</Link>
      
      </p>
    </div>
    </div>
  );
}