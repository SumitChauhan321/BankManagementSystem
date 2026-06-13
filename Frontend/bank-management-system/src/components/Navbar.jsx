import "./Navbar.css";
import { getUser } from "../services/authService";

function Navbar({ toggleSidebar }) {
  const user = getUser();

  return (
    <div className="navbar">

      <button
        className="menu-btn"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      
      <div className="user-info">
         <h3>{user?.username}</h3>
          <p>Account No:{user?.accountNumber}</p>
      </div>
      <img className="profile-pic"
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="profile"
        />
    </div>
  );
}

export default Navbar;