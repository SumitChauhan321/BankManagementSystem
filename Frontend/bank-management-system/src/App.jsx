import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/user/Dashboard";
import Deposit from "./pages/user/Deposit";
import Withdraw from "./pages/user/Withdraw";
import TransferMoney from "./pages/user/TransferMoney";
import Transaction from "./pages/user/Transaction";
import Profile from "./pages/user/Profile";
import ChangePassword from "./pages/user/ChangePassword";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Transactions from "./pages/admin/Transactions";
import UserDetails from "./pages/admin/UserDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        <Route path="/user" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="transfer" element={<TransferMoney />} />
          <Route path="transactions" element={<Transaction />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<MainLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="user/:id" element={<UserDetails />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;