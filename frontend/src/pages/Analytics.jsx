import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

import FraudLineChart from "../charts/FraudLineChart";
import FraudPieChart from "../charts/FraudPieChart";

import {
  FaChartLine,
  FaRobot,
  FaShieldAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const response = await api.get("/analytics");
      setAnalytics(response.data);
    } catch (error) {
      console.error("Failed to load analytics:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-xl font-semibold text-slate-600">
            Loading analytics...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold">
            Fraud Analytics
          </h1>

          <p className="text-slate-500 mt-2">
            AI-powered insights into transaction behaviour and fraud detection.
          </p>
        </div>

        {/* KPI Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaChartLine className="text-blue-600 text-3xl mb-3" />
            <p className="text-slate-500">Fraud Rate</p>
            <h2 className="text-3xl font-bold">
              {analytics.fraud_rate}%
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaRobot className="text-purple-600 text-3xl mb-3" />
            <p className="text-slate-500">Model Accuracy</p>
            <h2 className="text-3xl font-bold">
              {analytics.model_accuracy}%
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaExclamationTriangle className="text-red-600 text-3xl mb-3" />
            <p className="text-slate-500">Fraud Cases</p>
            <h2 className="text-3xl font-bold">
              {analytics.fraud_cases}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaShieldAlt className="text-green-600 text-3xl mb-3" />
            <p className="text-slate-500">Transactions</p>
            <h2 className="text-3xl font-bold">
              {analytics.transactions}
            </h2>
          </div>

        </div>

        {/* Charts */}

        <div className="grid lg:grid-cols-2 gap-6">

          <FraudLineChart />

          <FraudPieChart />

        </div>

        {/* AI Insights */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            AI Insights
          </h2>

          <div className="space-y-4">

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-xl">
              Fraud rate is currently{" "}
              <strong>{analytics.fraud_rate}%</strong>.
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-xl">
              Total fraud cases detected:{" "}
              <strong>{analytics.fraud_cases}</strong>.
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-xl">
              XGBoost model accuracy is{" "}
              <strong>{analytics.model_accuracy}%</strong>.
            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}