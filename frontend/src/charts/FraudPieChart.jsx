import { useState, useEffect } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import api from "../services/api";

const COLORS = ["#22c55e", "#ef4444"];

export default function FraudPieChart() {
  const [data, setData] = useState([
    { name: "Legitimate", value: 0 },
    { name: "Fraud", value: 0 },
  ]);

  useEffect(() => {
    async function loadChart() {
      try {
        const response = await api.get("/charts");
        
        setData(response.data.pie);
        
      } catch (error) {
        console.error("Pie Chart Error:", error);
      }
    }

    loadChart();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-bold mb-4">
        Fraud Distribution
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
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

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}