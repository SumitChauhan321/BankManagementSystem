
import { useState, useEffect } from "react";
import { getUser } from "../../services/authService";
import "../../styles/accountStyle/TransferMoney.css";

function TransferMoney() {

  const user = getUser();

  const [showConfirm, setShowConfirm] =useState(false);

  const [userData, setUserData] = useState(user);

  const [formData, setFormData] = useState({
    toAccountNumber: "",
    amount: ""
  });

  const [message, setMessage] = useState("");
  const [receiverError, setReceiverError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [checkingReceiver, setCheckingReceiver] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {

    if (!formData.amount) {
      setAmountError("");
      return;
    }

    if (
      Number(formData.amount) >
      Number(userData.balance)
    ) {

      setAmountError(
        "Insufficient balance"
      );

    } else {

      setAmountError("");

    }

  }, [formData.amount, userData.balance]);

  useEffect(() => {

    if (message) {

      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => clearTimeout(timer);

    }

  }, [message]);

  const checkReceiver = async () => {

    if (
      !formData.toAccountNumber.trim()
    ) {

      setReceiverError(
        "Account number is required"
      );

      return;
    }

    try {

      setCheckingReceiver(true);

      const response = await fetch(
        `http://localhost:8080/account/check-receiver?receiverNumber=${formData.toAccountNumber}`,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const data =
        await response.text();

      if (
        data ===
        "Receiver account not found"
      ) {

        setReceiverError(data);

      } else {

        setReceiverError("");

      }

    } catch {

      setReceiverError(
        "Unable to verify account"
      );

    } finally {

      setCheckingReceiver(false);

    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      receiverError ||
      amountError
    ) {
      return;
    }

    

    try {

      setIsLoading(true);

      const response = await fetch(
        "http://localhost:8080/account/transfer-money",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          },

          body: JSON.stringify({

            senderNumber:
              userData.accountNumber,

            receiverNumber:
              formData.toAccountNumber,

            amount:
              Number(formData.amount)

          })
        }
      );

      const data =
        await response.json();

      setMessage(data.message);

      if (
        data.message ===
        "Amount transferred successfully"
      ) {

        const updatedUser = {
          ...userData,
          balance: data.balance
        };

        setUserData(updatedUser);

        user.balance = data.balance;

        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        setFormData({
          toAccountNumber: "",
          amount: ""
        });
      }

    } catch {

      setMessage(
        "Transfer failed"
      );

    } finally {

      setIsLoading(false);

    }
  };

  return (
    <div className="transfer-page">

      <div className="transfer-heading">

        <h2>Transfer Money</h2>

        <p>
          Transfer money to another account securely.
        </p>

      </div>

      <div className="transfer-content">

        <div className="transfer-left">

          <div className="transfer-card">

            <h3>Transfer Money</h3>

            <form onSubmit={handleSubmit}>

              <label>
                From Account
              </label>

              <input
                value={`${userData.accountNumber} (${userData.username})`}
                readOnly
              />

              <label>
                Available Balance
              </label>

              <input
                value={`₹ ${userData.balance}`}
                readOnly
                className="balance-input"
              />

              <label>
                To Account Number
              </label>

              <input
                type="text"
                name="toAccountNumber"
                placeholder="Enter account number"
                value={
                  formData.toAccountNumber
                }
                onChange={handleChange}
                onBlur={checkReceiver}
              />

              {receiverError && (
                <p
                  style={{
                    color: "red",
                    marginTop: "5px",
                    fontSize:"12px"
                  }}
                >
                  {receiverError}
                </p>
              )}

              <label>
                Amount (₹)
              </label>

              <input
                type="number"
                min="1"
                name="amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
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

              {amountError && (
                <p
                  style={{
                    color: "red",
                    marginTop: "5px",
                    fontSize:"12px"
                  }}
                >
                  {amountError}
                </p>
              )}

              {message && (
                <p style={{color:"green"}}
                  className="message"
                >
                  {message}
                </p>
              )}

              <button
  type="button"
  className="transfer-btn"
  disabled={
    !formData.amount ||
    !formData.toAccountNumber ||
    receiverError ||
    amountError ||
    checkingReceiver ||
    isLoading
  }
  onClick={() =>
    setShowConfirm(true)
  }
>
  Transfer
</button>

            </form>

          </div>

        </div>

        <div className="transfer-right">

          <div className="summary-card">

            <div className="card-header">

              <h3>
                Account Summary
              </h3>

              <div className="wallet-icon">
                💳
              </div>

            </div>

            <div className="summary-row">
              <span>
                Account Number
              </span>

              <span>
                {userData.accountNumber}
              </span>
            </div>

            <div className="summary-row">
              <span>
                Account Type
              </span>

              <span>
                Savings Account
              </span>
            </div>

            <div className="summary-row">

              <span>
                Current Balance
              </span>

              <span
                className="green"
              >
                ₹ {userData.balance}
              </span>

            </div>

            <div className="summary-row">

              <span>
                Available Balance
              </span>

              <span
                className="green"
              >
                ₹ {userData.balance}
              </span>

            </div>

          </div>

          <div className="note-card">

            <div className="card-header">

              <h3>
                Important Note
              </h3>

              <div className="note-icon">
                i
              </div>

            </div>

            <ul>

              <li>
                Ensure the account number
                is correct before
                transferring.
              </li>

              <li>
                Transferred amount will be
                deducted instantly.
              </li>

            </ul>

          </div>

        </div>

      </div>

{showConfirm && (
  <div className="transfer-popup-overlay">

    <div className="transfer-popup">

      <h3>
        Confirm Transfer
      </h3>

      <p>
        Transfer
        <strong>
          {" "}₹{formData.amount}{" "}
        </strong>
        to account
        <strong>
          {" "}
          {formData.toAccountNumber}
        </strong>
        ?
      </p>

      <div className="transfer-popup-actions">

        <button
          className="cancel-transfer-btn"
          onClick={() =>
            setShowConfirm(false)
          }
        >
          Cancel
        </button>

        <button
          className="confirm-transfer-btn"
          onClick={() => {
            setShowConfirm(false);

            handleSubmit({
              preventDefault: () => {}
            });
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

export default TransferMoney;

