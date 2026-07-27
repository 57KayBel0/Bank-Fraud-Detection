import { useState, useEffect } from "react";

import api from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";

import StatCard from "../components/StatCard";
import PredictionForm from "../components/PredictionForm";
import PredictionHistory from "../components/PredictionHistory";
import ThemeToggle from "../components/ThemeToggle";

import FraudLineChart from "../charts/FraudLineChart";
import FraudPieChart from "../charts/FraudPieChart";

import {
  FaCreditCard,
  FaExclamationTriangle,
  FaShieldAlt,
  FaRobot,
  FaChartLine,
  FaDatabase,
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

  // Dark Mode

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  // Load Dashboard

  const loadDashboard = async () => {
    try {
      const dashboardResponse = await api.get("/dashboard");
      setStats(dashboardResponse.data);

      const historyResponse = await api.get("/history");
      setHistory(historyResponse.data);

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const addPrediction = async () => {
    await loadDashboard();
  };

  return (
    <DashboardLayout>

      <div
        className={`min-h-screen transition-all duration-300 ${
          darkMode
            ? "bg-slate-900 text-white"
            : "bg-slate-100 text-slate-900"
        }`}
      >

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              👋 Welcome Back, Kabelo
            </h1>

            <p
              className={`mt-2 ${
                darkMode
                  ? "text-slate-300"
                  : "text-slate-600"
              }`}
            >
              AI Powered Bank Fraud Detection Platform
            </p>

          </div>

          <ThemeToggle
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

        </div>

        {/* Hero */}

        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-8 shadow-xl mb-10">

          <h2 className="text-3xl font-bold">
            Real-Time Fraud Monitoring
          </h2>

          <p className="mt-3 text-lg opacity-90">
            Detect fraudulent transactions using Machine Learning,
            monitor financial activity, and analyse transaction
            patterns in real time.
          </p>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

          <StatCard
            title="Total Transactions"
            value={stats.transactions.toLocaleString()}
            subtitle="Processed Transactions"
            icon={<FaCreditCard />}
            color="from-blue-600 to-blue-800"
          />

          <StatCard
            title="Fraud Cases"
            value={stats.fraud_cases}
            subtitle="Detected by AI"
            icon={<FaExclamationTriangle />}
            color="from-red-500 to-red-700"
          />

          <StatCard
            title="Legitimate"
            value={stats.legitimate_cases}
            subtitle="Safe Transactions"
            icon={<FaShieldAlt />}
            color="from-green-500 to-green-700"
          />

          <StatCard
            title="Fraud Rate"
            value={`${stats.fraud_rate}%`}
            subtitle="Current Risk"
            icon={<FaChartLine />}
            color="from-orange-500 to-orange-700"
          />

          <StatCard
            title="AI Model"
            value={stats.model}
            subtitle={`${stats.model_accuracy}% Accuracy`}
            icon={<FaRobot />}
            color="from-purple-600 to-purple-800"
          />

          <StatCard
            title="Database"
            value="PostgreSQL"
            subtitle="Cloud Hosted"
            icon={<FaDatabase />}
            color="from-slate-700 to-slate-900"
          />

        </div>

        {/* Charts */}

        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          <FraudLineChart />

          <FraudPieChart />

        </div>

        {/* Prediction */}

        <PredictionForm
          onPrediction={addPrediction}
        />

        {/* History */}

        <PredictionHistory
          history={history}
        />

      </div>

    </DashboardLayout>
  );
}