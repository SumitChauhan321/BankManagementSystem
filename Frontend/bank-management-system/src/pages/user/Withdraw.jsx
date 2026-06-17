import { useState,useEffect } from "react";
import { getUser } from "../../services/authService";
import "../../styles/accountStyle/Withdraw.css";
import { data } from "react-router-dom";

function Withdraw() {

  const user = getUser();

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(user?.balance);

useEffect(() => {
      if (message) {
        const timer = setTimeout(() => {
          setMessage("");
        }, 5000);
    
        return () => clearTimeout(timer);
      }

    }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();


    

    if (!amount || Number(amount) <= 0) {
      setMessage("Please enter amount");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/account/withdraw-money",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            accountNumber: user.accountNumber,
            amount: Number(amount)
          })
        }
      );

      const data = await response.json();

      if (response.ok) {

        setMessage(data.message);
        setBalance(data.balance);
        setAmount("");
        user.balance = data.balance;

        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

      } else {

        setMessage(data.message);
      }

    } catch (error) {

      setMessage(data.message);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="withdraw-page">

      <div className="withdraw-heading">
        <h2>Withdraw Money</h2>
        <p>Withdraw money from your account securely.</p>
      </div>

      <div className="withdraw-content">

        <div className="withdraw-left">

          <div className="withdraw-card">

            <h3>Withdraw Money</h3>

            <form onSubmit={handleSubmit}>

              <label>Account Number</label>
              <input
                value={user?.accountNumber}
                readOnly
              />

              <label>Account Holder Name</label>
              <input
                value={user?.username}
                readOnly
              />

              <label>Available Balance</label>
              <input
                value={`₹ ${balance}`}
                readOnly
                className="balance-input"
              />

              <label>Amount (₹)</label>
              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => {

                  const value = e.target.value;

                  setAmount(value);

                  if (Number(value) > balance) {

                    setMessage(
                      `Insufficient balance. Available balance is ₹${balance}`
                    );

                  } else {

                    setMessage("");
                  }

                }}
              />



              {message && (
                <p className="message" style={{color:"green"}}>
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={!amount || loading}
                className="withdraw-btn"
              >
                {loading
                  ? "Processing..."
                  : "Withdraw"}
              </button>

            </form>

          </div>

        </div>

        <div className="withdraw-right">

          <div className="summary-card">

            <div className="card-header">
              <h3>Account Summary</h3>
              <div className="wallet-icon">💳</div>
            </div>

            <div className="summary-row">
              <span>Account Number</span>
              <span>{user?.accountNumber}</span>
            </div>

            <div className="summary-row">
              <span>Account Type</span>
              <span ><pre style={{ display: "inline" }}>     </pre>Savings Account</span>
            </div>

            <div className="summary-row">
              <span>Current Balance</span>
              <span className="green">
                <pre style={{ display: "inline" }}>   </pre>₹ {balance}
              </span>
            </div>

            <div className="summary-row">
              <span>Available Balance</span>
              <span className="green">₹ {balance}
              </span>
            </div>

          </div>

          <div className="note-card">

            <div className="card-header">
              <h3>Important Note</h3>
              <div className="note-icon">i</div>
            </div>

            <ul>
              <li>
                Withdrawn amount will be deducted
                from your account instantly.
              </li>
              <li>
                Make sure you have sufficient
                balance before withdrawing.
              </li>
            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Withdraw;