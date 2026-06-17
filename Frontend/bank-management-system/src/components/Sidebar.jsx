import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../services/authService";
import "./Sidebar.css";

function Sidebar({
  sidebarOpen,
  closeSidebar
}) {

  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      className={`sidebar ${
        sidebarOpen ? "show" : ""
      }`}
    >
      <div className="sidebar-header">
        <div className="bank-icon">
          🏦
        </div>

        <div className="bank-info">
          <h2>BMS</h2>
          <p>
            Bank Management System
          </p>
        </div>
      </div>

      <ul>

        {user?.role === "USER" && (
          <>
            <li>
              <Link
                to="/user/dashboard"
                onClick={closeSidebar}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/user/deposit"
                onClick={closeSidebar}
              >
                Deposit
              </Link>
            </li>

            <li>
              <Link
                to="/user/withdraw"
                onClick={closeSidebar}
              >
                Withdraw
              </Link>
            </li>

            <li>
              <Link
                to="/user/transfer"
                onClick={closeSidebar}
              >
                Transfer Money
              </Link>
            </li>

            <li>
              <Link
                to="/user/transactions"
                onClick={closeSidebar}
              >
                Transactions
              </Link>
            </li>

            <li>
              <Link
                to="/user/profile"
                onClick={closeSidebar}
              >
                Profile
              </Link>
            </li>

            
          </>
        )}

        {user?.role === "ADMIN" && (
          <>
            <li>
              <Link
                to="/admin/dashboard"
                onClick={closeSidebar}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/admin/users"
                onClick={closeSidebar}
              >
                Users
              </Link>
            </li>

            <li>
              <Link
                to="/admin/transactions"
                onClick={closeSidebar}
              >
                Transactions
              </Link>
            </li>
          </>
        )}

        <li>
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;