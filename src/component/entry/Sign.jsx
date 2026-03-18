import { useState } from "react";
import "./sign.css";
import { Link } from "react-router-dom";
export default function Signin() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", form);
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