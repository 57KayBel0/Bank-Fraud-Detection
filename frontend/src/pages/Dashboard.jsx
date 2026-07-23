import { useState, useEffect } from "react";

import api from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";

import StatCard from "../components/StatCard";
import PredictionForm from "../components/PredictionForm";
import PredictionHistory from "../components/PredictionHistory";

import FraudLineChart from "../charts/FraudLineChart";
import FraudPieChart from "../charts/FraudPieChart";

import {
  FaCreditCard,
  FaExclamationTriangle,
  FaShieldAlt,
  FaRobot,
} from "react-icons/fa";

export default function Dashboard() {
  const [history, setHistory] = useState([]);

  const [stats, setStats] = useState({
    transactions: 0,
    fraud_cases: 0,
    legitimate_cases: 0,
    fraud_rate: 0,
    model: "",
    model_accuracy: 0,
  });

  // Load dashboard statistics and prediction history
  const loadDashboard = async () => {
    try {
      const dashboardResponse = await api.get("/dashboard");
      setStats(dashboardResponse.data);

      const historyResponse = await api.get("/history");
      setHistory(historyResponse.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // Refresh dashboard after every prediction
  const addPrediction = async () => {
    await loadDashboard();
  };

  return (
    <DashboardLayout>
      {/* Page Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-slate-500 mt-2">
          AI Powered Fraud Detection Dashboard
        </p>
      </div>

      {/* Dashboard Statistics */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Total Predictions"
          value={stats.transactions.toLocaleString()}
          icon={<FaCreditCard />}
          color="bg-blue-600"
        />

        <StatCard
          title="Fraud Cases"
          value={stats.fraud_cases}
          icon={<FaExclamationTriangle />}
          color="bg-red-500"
        />

        <StatCard
          title="Fraud Rate"
          value={`${stats.fraud_rate}%`}
          icon={<FaShieldAlt />}
          color="bg-green-500"
        />

        <StatCard
          title="Model"
          value={stats.model}
          icon={<FaRobot />}
          color="bg-purple-600"
        />

      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-6 mb-8">

        <FraudLineChart />

        <FraudPieChart />

      </div>

      {/* Prediction Form */}

      <PredictionForm
        onPrediction={addPrediction}
      />

      {/* Prediction History */}

      <PredictionHistory
        history={history}
      />

    </DashboardLayout>
  );
}