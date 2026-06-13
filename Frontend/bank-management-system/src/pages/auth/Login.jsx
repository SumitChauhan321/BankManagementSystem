import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/authStyle/Login.css";
import { saveAuthData } from "../../services/authService";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }
      saveAuthData(data);
      
      if (data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }

    } catch (error) {
      setError("Server is not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
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

        <form className="login-card" onSubmit={handleLogin}>

          <h2>Welcome Back!</h2>

          <p className="sub-title">
            Log in to your account
          </p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <label>Email</label>
          <div className="input-box">
            <span>👤</span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <label>Password</label>
          <div className="input-box">
            <span>🔒</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <div className="forgot">
            <a href="/">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="register">
            Don't have an account?
            <a href="/register"> Register here</a>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Login;