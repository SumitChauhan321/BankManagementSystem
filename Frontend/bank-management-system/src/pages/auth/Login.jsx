import React, { useState } from "react";
import "../../styles/authStyle/Login.css";

function Login() {


  return (
    <>
      <div className="login-page">
        <div className="left-panel">
          <div className="bank-icon">🏦</div>
          <h1>Bank Management System</h1>
          <p>
            Secure Banking For
            <br />
            Better Tomorrow
          </p>

          <div className="shield-icon">🛡️</div>
        </div>
        <div className="right-panel">

          <div className="login-card">

            <h2>Welcome Back!</h2>

            <p className="sub-title">Log in to your account</p>
            
            <label>Email</label>
            <div className="input-box">
              <span>👤</span>
              <input type="email" placeholder="Enter your email" />
            </div>
            
            <label>Password</label>
            <div className="input-box">
              <span>🔒</span>
              <input type="password" placeholder="Enter your password"/>
            </div>

            <div className="forgot">
              <a href="/">Forgot Password?</a>
            </div>

            <button className="login-btn">Login</button>

            <p className="register">
              Don't have an account?<a href="/"> Register here</a>
            </p>


          </div>
        </div>


      </div>
    </>
  );
}

export default Login;