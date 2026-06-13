import { useState } from "react";
import "../../styles/accountStyle/Deposit.css";
import { getUser } from "../../services/authService";
function Deposit() {
  const user = getUser();
  const [amount, setAmount] = useState("");

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
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                />
              </div>
              <button
                type="submit"
                className="deposit-btn"
              >
                Deposit
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
              <span><pre style={{display:"inline"}}>  </pre>{user?.username}</span>
            </div>

            <div className="summary-row">
              <span>Current Balance</span>
              <span className="balance"><pre style={{display:"inline"}}> ₹ </pre>
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

    </div>
  );
}

export default Deposit;