import { useState, useEffect } from "react";
import api from "../services/api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function FraudLineChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadTrend() {
      try {
        const response = await api.get("/fraud-trend");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadTrend();
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          📈 Fraud Trend
        </h2>

        <p className="text-slate-500">
          Daily fraud detections
        </p>

      </div>

      <ResponsiveContainer width="100%" height={320}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "none",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
          />

          <Line
            type="monotone"
            dataKey="fraud"
            stroke="#ef4444"
            strokeWidth={4}
            dot={{
              r: 5,
            }}
            activeDot={{
              r: 8,
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}