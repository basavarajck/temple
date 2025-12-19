import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import VillagerDashboard from "./pages/VillagerDashboard";
import CommitteeDashboard from "./pages/CommitteeDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import VillagerIncomeExpense from "./pages/VillagerIncomeExpense";
import CommitteeAddIncome from "./pages/CommitteeAddIncome";
import CommitteeAddExpense from "./pages/CommitteeAddExpense";
import AdminApproveExpenses from "./pages/AdminApproveExpenses";
import AdminLockMonth from "./pages/AdminLockMonth";
import AdminMonthlyReports from "./pages/AdminMonthlyReports";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />

        {/* Villager */}
        <Route
          path="/villager"
          element={
            <ProtectedRoute allowedRoles={["villager"]}>
              <VillagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/villager/income-expense"
          element={
            <ProtectedRoute allowedRoles={["villager"]}>
              <VillagerIncomeExpense />
            </ProtectedRoute>
          }
        />

        {/* Committee */}
        <Route
          path="/committee"
          element={
            <ProtectedRoute allowedRoles={["committee"]}>
              <CommitteeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/committee/income"
          element={
            <ProtectedRoute allowedRoles={["committee", "admin"]}>
              <CommitteeAddIncome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/committee/expense"
          element={
            <ProtectedRoute allowedRoles={["committee", "admin"]}>
              <CommitteeAddExpense />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/expenses"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminApproveExpenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/lock"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLockMonth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminMonthlyReports />
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
