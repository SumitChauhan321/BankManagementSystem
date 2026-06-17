import "../../styles/accountStyle/Dashboard.css";
import { getUser } from "../../services/authService";
import { useEffect, useState } from "react";

function Dashboard() {
  const user = getUser();
  const [dashboardData, setDashboardData] =
    useState({
      list: [],
      totalDeposit: 0,
      totalWithdraw: 0,
      totalTransaction: 0
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const response = await fetch(
          `http://localhost:8080/account/dashboard?userId=${user.id}`,
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        const data =
          await response.json();

        setDashboardData(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchDashboard();

  }, [user.id]);

  if (loading) {
  return <h2>Loading...</h2>;
}
  return (
    <div className="dashboard">

      {/* Header */}

      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>
          Welcome back, {user?.username} 👋
        </p>
      </div>

      {/* Stats Cards */}

      <div className="stats-grid">

        <div className="stat-card">
          <div className="card-top">

            <div>
              <h5>Total Balance</h5>
              <h2>
                ₹ {user?.balance}
              </h2>
            </div>

            <div className="icon-box blue-bg">
              <img
                src="https://cdn-icons-png.flaticon.com/512/891/891419.png"
                alt="balance"
              />
            </div>

          </div>





        </div>

        <div className="stat-card">
          <div className="card-top">

            <div>
              <h5>Total Deposits</h5>
              <h2>
                ₹ {dashboardData.totalDeposit}
              </h2>
            </div>

            <div className="icon-box green-bg">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2985/2985150.png"
                alt="deposit"
              />
            </div>

          </div>



        </div>

        <div className="stat-card">
          <div className="card-top">

            <div>
              <h5>Total Withdrawals</h5>
              <h2>
                ₹ {dashboardData.totalWithdraw}
              </h2>
            </div>

            <div className="icon-box red-bg">
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
                alt="withdraw"
              />
            </div>

          </div>



        </div>

        <div className="stat-card">
          <div className="card-top">

            <div>
              <h5>Total Transactions</h5>
              <h2>{dashboardData.totalTransaction}</h2>
            </div>

            <div className="icon-box purple-bg">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3500/3500833.png"
                alt="transaction"
              />
            </div>

          </div>



        </div>

      </div>

      {/* Middle Section */}

      <div className="middle-section">

        {/* Account Overview */}
        <div>
          <div className="overview-card">

            <div className="card-title">
              <h3>Account Overview</h3>
            </div>

            <div className="overview-content">

              <div className="overview-bank-icon">
                🏦
              </div>
              <div className="overview-con">
                <div className="overview-item">
                  <p>Account Number</p>
                  <h4>
                    {user?.accountNumber}
                  </h4>
                </div>

                <div className="overview-item">
                  <p>Account Type</p>
                  <h4>
                    Savings Account
                  </h4>
                </div>

                <div className="overview-item">
                  <p>Current Balance</p>
                  <h4 className="green-text">
                    ₹ {user?.balance}
                  </h4>
                </div>

                <div className="overview-item" >
                  <p>Available Balance</p>
                  <h4 className="green-text">
                    ₹ {user?.balance}
                  </h4>
                </div>
              </div>
            </div>

          </div>





          {/* Quick Actions */}

          <div className="quick-actions">

            <h3>Quick Actions</h3>

            <div className="action-grid">

              <div className="action-card deposit-action">
                ⬇
                <p>Deposit</p>
              </div>

              <div className="action-card withdraw-action">
                ⬆
                <p>Withdraw</p>
              </div>

              <div className="action-card transfer-action">
                ⇄
                <p>Transfer</p>
              </div>

              <div className="action-card transaction-action">
                📄
                <p>Transactions</p>
              </div>
            </div>
          </div>
        </div>




        {/* Recent Transactions */}

        <div className="transaction-card">

          <div className="transaction-header">
            <h3>Recent Transactions</h3>

            <span className="view-all">
              View All
            </span>
          </div>

          {dashboardData.list.map((transaction) => (

            <div
              className="transaction-item"
              key={transaction.id}
            >

              <div>

                <h5>
                  {transaction.description}
                </h5>

                <small>
                  {transaction.transactionDate}
                </small>

              </div>

              <span
                className={
                  transaction.transactionType
                    .toLowerCase() === "deposit"
                    ? "green-text"
                    : "red-text"
                }
              >

                {transaction.transactionType
                  .toLowerCase() === "deposit"
                  ? "+"
                  : "-"}

                ₹ {transaction.amount}

              </span>

            </div>

          ))}

        </div>

      </div>



      {/* Security Banner */}

      <div className="security-banner">

        <div>
          <h4>
            Secure & Trusted Banking
          </h4>

          <p>
            Your transactions are protected
            with 256-bit SSL encryption.
          </p>
        </div>

        <button>
          Learn More
        </button>

      </div>

    </div>
  );
}

export default Dashboard;