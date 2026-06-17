import { useEffect, useState } from "react";
import { getUser } from "../../services/authService";
import "../../styles/accountStyle/Transaction.css";

function Transaction() {

  const user = getUser();

  const [data, setData] = useState({
    list: [],
    totalDeposit: 0,
    totalWithdraw: 0,
    totalTransfer: 0,
    totalTransation: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchTransactions = async () => {

      try {

        const response = await fetch(
          `http://localhost:8080/account/recent-transaction?userId=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        const result = await response.json();

        setData(result);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchTransactions();

  }, [user.id]);

  if (loading) {
    return (
      <div className="txn-page">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="txn-page">

      <div className="txn-header">
        <h1>Transactions</h1>
      </div>

      {/* Top Cards */}

      <div className="txn-stats">

        <div className="txn-stat-card">

          <div className="txn-icon txn-blue">
            ⇄
          </div>

          <div className="txn-stat-card-content">
            <h5>Total Transactions</h5>
            <h2 style={{ fontSize: "16px" }}>
              {data.totalTransation}
            </h2>
          </div>

        </div>

        <div className="txn-stat-card">

          <div className="txn-icon txn-green">
            ↓
          </div>

          <div className="txn-stat-card-content">
            <h5>Total Deposits</h5>
            <h2 className="txn-positive">
              ₹ {data.totalDeposit}
            </h2>
          </div>

        </div>

        <div className="txn-stat-card">

          <div className="txn-icon txn-red">
            ↑
          </div>

          <div className="txn-stat-card-content">
            <h5>Total Withdrawals</h5>
            <h2 className="txn-negative">
              ₹ {data.totalWithdraw}
            </h2>
          </div>

        </div>

        <div className="txn-stat-card">

          <div className="txn-icon txn-purple">
            ⇆
          </div>

          <div className="txn-stat-card-content">
            <h5>Total Transfers</h5>
            <h2
              style={{
                color: "#9333ea",
                fontSize: "14px"
              }}
            >
              ₹ {data.totalTransfer}
            </h2>
          </div>

        </div>

      </div>

      {/* Transaction Table */}

      <div className="txn-table-card">

        <table className="txn-table">

          <thead>

            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {data.list.map((item) => (

              <tr key={item.id}>

                <td>
                  {item.transactionDate}
                </td>

                <td>
                  <strong>
                    {item.description}
                  </strong>
                </td>

                <td>

                  <span
                    className={`txn-badge ${
                      item.transactionType === "Deposit"
                        ? "txn-deposit"
                        : item.transactionType === "Withdraw"
                        ? "txn-withdraw"
                        : "txn-transfer"
                    }`}
                  >
                    {item.transactionType}
                  </span>

                </td>

                <td
                  className={
                    item.transactionType === "Deposit"
                      ? "txn-positive"
                      : "txn-negative"
                  }
                >

                  {item.transactionType === "Deposit"
                    ? "+"
                    : "-"}

                  ₹ {item.amount}

                </td>

                <td>
                  <span className="txn-success">
                    Completed
                  </span>
                </td>

              </tr>

            ))}

            {/* Empty Rows up to 10 */}

            {[...Array(
              Math.max(
                0,
                10 - data.list.length
              )
            )].map((_, index) => (

              <tr
                key={index}
                className="txn-empty-row"
              >
                <td colSpan="5"></td>
              </tr>

            ))}

          </tbody>

        </table>

        {/* Pagination UI */}

        
      </div>

    </div>
  );
}

export default Transaction;