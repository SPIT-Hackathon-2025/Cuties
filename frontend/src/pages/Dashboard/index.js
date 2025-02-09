import './index.css';
import { Fragment, useEffect, useState } from 'react';
import TypeDistributionChart from 'components/Charts/TypeDistributionChart';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTransactions = async () => {
    try {
      const response = await fetch('http://localhost:4000/getData');
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Failed to fetch data');
      return null;
    }
  };

  useEffect(() => {
    const initializeDashboard = async () => {
      const transactions = await getTransactions();
      if (transactions) {
        setData(transactions);
      }
      setLoading(false);
    };

    initializeDashboard();
    const interval = setInterval(initializeDashboard, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="dashboard">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard">Error: {error}</div>;
  }

  const netFlow = data?.reduce((sum, transaction) => sum + transaction.amount, 0) || 0;
  const avgAmount = data ? (netFlow / data.length).toFixed(2) : 0;
  const uniqueBuyers = data ? new Set(data.map(t => t.buyer)).size : 0;

  return (
    <Fragment>
      <div className="dashboard">
        <h1 className="dashboard__heading_main">Dashboard</h1>
        <div className="dashboard__container">
          {data.length === 0 ? (
            <p>No transaction data available.</p>
          ) : (
            <>
              <div className="dashboard__metrics-container">
                <div className="dashboard__card">
                  <h2 className="dashboard__heading">Net Flow</h2>
                  <div className="dashboard__net-flow">${netFlow.toLocaleString()}</div>
                  {/* <div className="dashboard__blockchain-address">
                    0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                  </div> */}
                </div>

                <div className="dashboard__card">
                  <h2 className="dashboard__heading">Transaction Statistics</h2>
                  <div className="dashboard__metric-value">
                    Total Transactions <span>{data?.length || 0}</span>
                  </div>
                  <div className="dashboard__metric-value">
                    Average Amount <span>${avgAmount}</span>
                  </div>
                  <div className="dashboard__metric-value">
                    Unique Buyers <span>{uniqueBuyers}</span>
                  </div>
                </div>

                {data && <TypeDistributionChart data={data} />}
              </div>

              <div className="dashboard__transactions-container dashboard__card">
                <h2 className="dashboard__heading">Transaction History</h2>
                <table className="dashboard__table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Buyer</th>
                      <th>Seller</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((transaction, index) => (
                      <tr key={index}>
                        <td>
                          <span className="dashboard__transaction-type">
                            {transaction.type}
                          </span>
                        </td>
                        <td>${transaction.amount.toLocaleString()}</td>
                        <td>{transaction.buyer}</td>
                        <td>{transaction.seller}</td>
                        <td>
                          {new Date(transaction.timestamp * 1000).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
