import { useState, useEffect } from "react";
import "../../styles/accountStyle/Deposit.css";
import { getUser } from "../../services/authService";
function Deposit() {
  const user = getUser();

  const [userData, setUserData] = useState(user);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const isValidAmount =
    amount &&
    Number(amount) > 0;

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);


  const openConfirmPopup = (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setMessage("Please enter a valid amount");
      return;
    }

    setShowConfirm(true);
  };

  const handleDeposit = async () => {

    try {

      setIsLoading(true);

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/account/deposit-money",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify({
            accountNumber:
              userData.accountNumber,
            amount:
              Number(amount),
          }),
        }
      );

      const data =
        await response.json();

      if (response.ok) {

        setMessage(data.message);

        const updatedUser = {
          ...userData,
          balance: data.balance,
        };

        setUserData(updatedUser);

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        setAmount("");

      } else {

        setMessage(
          data.message ||
          "Transaction failed"
        );
      }

    } catch (error) {

      setMessage(
        "Server error. Please try again."
      );

    } finally {

      setIsLoading(false);

    }
  };
  return (
    <div className="deposit-container">
      <div className="deposit-heading">
        <h2>Deposit Money</h2>
        <p>Add money to your account securely</p>
      </div>
      <div className="deposit-content">

        <div className="deposit-left">
          <div className="deposit-card">
            <h2>Deposit Money</h2>


            <form>
              <div className="form-group">
                <label>Account Number</label>
                <input type="text" value={`Saving Account - ${user.accountNumber}`} readOnly />
              </div>
              <div className="form-group">
                <label>Account Holder Name</label>
                <input type="text" value={user.username} readOnly />
              </div>
              <div className="form-group">
                <label>Amount (₹)</label>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "-" ||
                      e.key === "+" ||
                      e.key === "e" ||
                      e.key === "E"
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              {message && (
                <p
                  style={{
                    color: message.toLowerCase().includes("success")
                      ? "green"
                      : "red",
                    fontWeight: "600",
                    marginBottom: "15px",
                    textAlign: "center",
                  }}
                >
                  {message}
                </p>
              )}
              <button
                type="button"
                className="deposit-btn"
                disabled={
                  !isValidAmount ||
                  isLoading
                }
                onClick={openConfirmPopup}
              >
                {isLoading
                  ? "Processing..."
                  : "Deposit"}
              </button>
            </form>
          </div>
        </div>


        <div className="deposit-right">

          <div className="summary-card">
            <div className="summary-header">
              <h3>Account Summary</h3>
              <div className="summary-icon">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2331/2331941.png"
                  alt="wallet"
                />
              </div>
            </div>
            <div className="summary-row">
              <span>Account Number</span>
              <span>{user?.accountNumber}</span>
            </div>

            <div className="summary-row">
              <span>Account Holder</span>
              <span><pre style={{ display: "inline", color: "green" }}>  </pre>{user?.username}</span>
            </div>

            <div className="summary-row">
              <span>Current Balance</span>
              <span className="balance"><pre style={{ display: "inline" }}> ₹ </pre>
                {user?.balance}
              </span>
            </div>
          </div>

          <div className="note-card">
            <div className="note-header">
              <h3>Note</h3>

              <div className="note-icon">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
                  alt="info"
                />
              </div>
            </div>

            <p>
              Deposited amount will be added instantly
              to your account and recorded in transaction history.
            </p>

          </div>



        </div>
      </div>


      {showConfirm && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Confirm Deposit</h3>

            <p>
              Are you sure you want to deposit
              <strong>  ₹{amount } </strong>
               into account
              <strong> {userData?.accountNumber}</strong> ?
            </p>

            <div className="popup-buttons">

              <button
                type="button"
                className="cancel-btn"
                onClick={() =>
                  setShowConfirm(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="confirm-btn"
                onClick={() => {
                  setShowConfirm(false);
                  handleDeposit();
                }}
              >
                Confirm
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Deposit;