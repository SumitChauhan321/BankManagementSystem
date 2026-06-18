import { useState } from "react";
import "../../styles/authStyle/Register.css";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    password: "",
  });

  const [emailMessage, setEmailMessage] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;

      setFormData((prev) => ({
        ...prev,
        phone: value,
      }));

      setErrors((prev) => ({
        ...prev,
        phone:
          value.length > 0 && value.length < 10
            ? "Phone number must be exactly 10 digits"
            : "",
      }));

      return;
    }

    const updated = {
      ...formData,
      [name]: value,
    };

    setFormData(updated);

    if (
      (name === "password" ||
        name === "confirmPassword") &&
      updated.confirmPassword
    ) {
      setErrors((prev) => ({
        ...prev,
        password:
          updated.password !== updated.confirmPassword
            ? "Passwords do not match"
            : "",
      }));
    }
  };
 
  const checkEmail = async () => {
    if (!formData.email.trim()) return;
 
    try {
      const response = await fetch(
        `http://localhost:8080/auth/check-email?email=${encodeURIComponent(
          formData.email
        )}`
      );

      const data = await response.json();

      setEmailMessage(data.message);
      setEmailExists(data.exists);
    } catch (error) {
      setEmailMessage("Unable to verify email");
      setEmailExists(true);
    }
  };

  const isValid =
    formData.fullName.trim() &&
    formData.email.trim() &&
    !emailExists &&
    formData.phone.length === 10 &&
    formData.dob &&
    formData.address.trim() &&
    formData.password &&
    formData.confirmPassword &&
    !errors.phone &&
    !errors.password;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) return;

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.fullName,
            email: formData.email,
            phoneNumber: formData.phone,
            dateOfBirth: formData.dob,
            address: formData.address,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      setSuccessMessage(data.message);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        address: "",
        password: "",
        confirmPassword: "",
      });

      setEmailMessage("");
      setEmailExists(false);
      navigate("/");

    } catch (error) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="left-section">
        <div className="logo">🏦</div>

        <h1>Bank Management System</h1>

        <div className="divider"></div>

        <p>
          Secure Banking For
          <br />
          Better Tomorrow
        </p>

        <div className="features">
          <div className="feature">
            <span>🛡️</span>
            <h4>Secure</h4>
            <p>Your Transactions</p>
          </div>

          <div className="feature">
            <span>⚡</span>
            <h4>Fast & Reliable</h4>
            <p>Always For You</p>
          </div>

          <div className="feature">
            <span>👤</span>
            <h4>User Friendly</h4>
            <p>Experience</p>
          </div>
        </div>
      </div>

      <div className="right-section">
        <form
          className="register-card"
          onSubmit={handleSubmit}
        >
          <h2>
            Create Your <span>Account</span>
          </h2>

          <p className="subtitle">
            Fill in the details below to register
          </p>

          <div className="form-grid">
            <div className="register-input-box">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="register-input-box">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                onBlur={checkEmail}
              />

              {emailMessage && (
                <p
                  className={
                    emailExists
                      ? "error"
                      : "success-message"
                  }
                >
                  {emailMessage}
                </p>
              )}
            </div>

            <div className="register-input-box">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />

              {errors.phone && (
                <p className="error">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="register-input-box">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                
              />
            </div>

            <div className="full-width register-input-box">
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="register-input-box">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="register-input-box">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              {errors.password && (
                <p className="error">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          {successMessage && (
            <p className="success-message">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={!isValid || loading}
            className={`register-btn ${
              !isValid ? "disabled-btn" : ""
            }`}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

          <p className="login-link">
            Already have an account?
            <a href="/"> Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;