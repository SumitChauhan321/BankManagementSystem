import "../../styles/accountStyle/Profile.css";
import { getUser } from "../../services/authService";

function Profile() {

  const user = getUser();

  return (
    <div className="profile-page">

      {/* Header */}

      <div className="profile-header">

        <h1>My Profile</h1>

        

      </div>

      {/* Profile Card */}

      <div className="profile-card">

        <div className="profile-image">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
          />

          <button className="camera-btn">
            📷
          </button>

        </div>

        <div className="profile-info">

          <h2>{user?.username}</h2>

          <span className="role-badge">
            👤 Account Holder
          </span>

        </div>

      </div>

      {/* Info Section */}

      <div className="profile-grid">

        {/* Personal Information */}

        <div className="info-card">

          <h3>Personal Information</h3>

          <div className="info-row">
            <span>👤 Username</span>
            <strong>{user?.username}</strong>
          </div>

          <div className="info-row">
            <span>📧 Email</span>
            <strong>{user?.email}</strong>
          </div>

          <div className="info-row">
            <span>📱 Mobile Number</span>
            <strong>{user?.mobileNumber}</strong>
          </div>

          <div className="info-row">
            <span>📍 Address</span>
            <strong>{user?.address}</strong>
          </div>

          <div className="info-row">
            <span>📅 Date of Birth</span>
            <strong>{user?.dateOfBirth}</strong>
          </div>

        </div>

        {/* Account Information */}

        <div className="info-card">

          <h3>Account Information</h3>

          <div className="info-row">
            <span>💳 Account Number</span>
            <strong>{user?.accountNumber}</strong>
          </div>

          <div className="info-row">
            <span>₹ Balance</span>

            <strong className="balance">
              ₹ {user?.balance}
            </strong>

          </div>

          <div className="info-row">
            <span>🛡 Role</span>
            <strong>
              {user?.role}
            </strong>
          </div>

        </div>

      </div>

      {/* Security */}

      <div className="security-card">

        <div className="security-left">

          <div className="security-icon">
            🛡
          </div>

          <div>

            <h3>
              Keep your account secure
            </h3>

            <p>
              We recommend you update
              your password regularly.
            </p>

          </div>

        </div>

        <button className="change-password-btn">
          🔒 Change Password
        </button>

      </div>

    </div>
  );
}

export default Profile;