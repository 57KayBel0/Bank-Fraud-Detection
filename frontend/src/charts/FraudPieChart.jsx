import { useState, useEffect } from "react";

import api from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#ef4444",
];

export default function FraudPieChart() {

  const [data, setData] = useState([]);

  useEffect(() => {

    async function loadChart() {

      try {

        const response = await api.get("/charts");

        setData(response.data.pie);

      } catch (error) {

        console.error(error);

      }

    }

    loadChart();

  }, []);

  return (

    <div className="bg-white rounded-3xl shadow-xl p-6">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          🥧 Fraud Distribution
        </h2>

        <p className="text-slate-500">
          Legitimate vs Fraudulent Transactions
        </p>

      </div>

      <ResponsiveContainer width="100%" height={320}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            innerRadius={55}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );
}