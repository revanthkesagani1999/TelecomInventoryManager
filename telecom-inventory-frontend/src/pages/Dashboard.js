import React from 'react';
import '../styles/components/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-overview">
        <div className="dashboard-card">
          <h2>Products</h2>
          <p>View and manage your inventory.</p>
        </div>
        <div className="dashboard-card">
          <h2>Suppliers</h2>
          <p>Manage your supplier relationships.</p>
        </div>
        <div className="dashboard-card">
          <h2>Reports</h2>
          <p>View detailed reports and analytics.</p>
        </div>
      </div>
      <div className="dashboard-actions">
        <a href="/products">Go to Products</a>
        <a href="/suppliers">Go to Suppliers</a>
        <a href="/reports">View Reports</a>
      </div>
    </div>
  );
};

export default Dashboard;
