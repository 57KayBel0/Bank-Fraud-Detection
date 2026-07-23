import { useState, useEffect } from "react";

import api from "../services/api";

import {
  LineChart,
  Line,
 XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function FraudLineChart() {

  const [data, setData] = useState([]);

  useEffect(() => {

    async function loadTrend() {

      try {

        const response = await api.get("/charts");

        setData(response.data.line);

      } catch (error) {

        console.error(error);

      }

    }

    loadTrend();

  }, []);

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-bold mb-4">

        Fraud Trend

      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="fraud"
            stroke="#ef4444"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}