import { useState } from "react";
import "./sign.css";
import { Link } from "react-router-dom";
import {signup } from "../../services/AuthServices";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


export default function SignUp({ onSwitch }) {
    const [status, setStatus] = useState("");

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone:"",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", form);
    try{
        const res = await signup(form);
        console.log(res);
        if(res?.success){
            setStatus(res?.message);  
            setTimeout(()=>{
                navigate("/signin")

            },2000);      
         
        }
    }catch(err){
        setStatus(err.message);
        console.error(err);
    }

  };

  return (
    <div id="auth-wrapper">
    <div className="auth-container">
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
         <input
          type="number"
          name="phone"
          placeholder="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

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
        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{" "}
       < Link to="/signin">Sign in</Link>
      
      </p>
    </div>
    </div>
  );
}