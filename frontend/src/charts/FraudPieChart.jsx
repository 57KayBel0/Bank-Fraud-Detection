import { useState, useEffect } from "react";

import api from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RISK_COLORS = {
  Legitimate: "#22c55e",
  "High Risk": "#ef4444",
  "Medium Risk": "#f97316",
  "Low Risk": "#2563eb",
};

export default function FraudPieChart() {
  const [data, setData] = useState([]);

  const [totalTransactions, setTotalTransactions] =
    useState(0);

  useEffect(() => {
    async function loadChart() {
      try {
        const response = await api.get("/analytics");

        const analytics = response.data;

        const total =
          analytics.transactions || 0;

        const legitimate =
          analytics.legitimate_cases || 0;

        const fraud =
          analytics.fraud_cases || 0;

        /*
         * Your current backend gives us:
         *
         * Legitimate
         * Fraud
         *
         * We display Fraud as High Risk and keep
         * Medium/Low Risk at zero until your backend
         * provides separate risk classifications.
         */

        const chartData = [
          {
            name: "Legitimate",
            value: legitimate,
          },
          {
            name: "High Risk",
            value: fraud,
          },
          {
            name: "Medium Risk",
            value: 0,
          },
          {
            name: "Low Risk",
            value: 0,
          },
        ];

        setData(chartData);
        setTotalTransactions(total);

      } catch (error) {
        console.error(
          "Failed to load fraud distribution:",
          error
        );
      }
    }

    loadChart();
  }, []);

  const calculatePercentage = (value) => {
    if (!totalTransactions) {
      return 0;
    }

    return Math.round(
      (value / totalTransactions) * 100
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6">

      {/* ================= HEADER ================= */}

      <div className="mb-5">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">

            <span className="text-lg">
              🥧
            </span>

          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Fraud Distribution
          </h2>

        </div>

        <p className="text-slate-500 text-sm mt-1 ml-12">
          Distribution of Fraudulent Transactions
        </p>

      </div>

      {/* ================= CHART + LEGEND ================= */}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr] items-center gap-4">

        {/* ================= DONUT ================= */}

        <div className="relative">

          <ResponsiveContainer
            width="100%"
            height={270}
          >

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={68}
                outerRadius={105}
                paddingAngle={1}
                startAngle={90}
                endAngle={-270}
                stroke="#ffffff"
                strokeWidth={2}
                animationDuration={1000}
              >

                {data.map((entry) => (

                  <Cell
                    key={entry.name}
                    fill={
                      RISK_COLORS[entry.name]
                    }
                  />

                ))}

              </Pie>

              <Tooltip
                formatter={(value, name) => [
                  `${value}`,
                  name,
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                  boxShadow:
                    "0 10px 30px rgba(15,23,42,0.12)",
                }}
              />

            </PieChart>

          </ResponsiveContainer>

          {/* Center Text */}

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              pointer-events-none
            "
          >

            <div className="text-center">

              <p className="text-3xl font-bold text-slate-900">
                {totalTransactions}
              </p>

              <p className="text-sm font-medium text-slate-600">
                Total
              </p>

              <p className="text-sm font-medium text-slate-600">
                Transactions
              </p>

            </div>

          </div>

        </div>

        {/* ================= LEGEND ================= */}

        <div className="space-y-2">

          {data.map((item) => {

            const percentage =
              calculatePercentage(
                item.value
              );

            return (
              <div
                key={item.name}
                className="
                  flex
                  items-center
                  justify-between
                  py-3
                  border-b
                  border-slate-200
                  last:border-b-0
                "
              >

                {/* Label */}

                <div className="flex items-center gap-3">

                  <span
                    className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor:
                        RISK_COLORS[
                          item.name
                        ],
                    }}
                  />

                  <span className="font-semibold text-slate-700">
                    {item.name}
                  </span>

                </div>

                {/* Number */}

                <div className="flex items-center gap-6">

                  <span className="font-semibold text-slate-700 min-w-[25px] text-right">
                    {item.value}
                  </span>

                  <span className="text-slate-500 min-w-[45px] text-right">
                    {percentage}%
                  </span>

                </div>

              </div>
            );

          })}

        </div>

      </div>

    </div>
  );
}