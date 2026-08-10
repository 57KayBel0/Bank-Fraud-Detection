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
  Area,
} from "recharts";

export default function FraudLineChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadTrend() {
      try {
        const response = await api.get("/analytics");

        const trend = response.data.trend || [];

        /*
         * Create a seven-day timeline.
         *
         * The backend may only return days where transactions
         * exist. Missing days are displayed as 0 instead of
         * disappearing from the chart.
         */

        if (trend.length > 0) {
          const latestDate = new Date(
            trend[trend.length - 1].day
          );

          const sevenDays = [];

          for (let i = 6; i >= 0; i--) {
            const date = new Date(latestDate);

            date.setDate(latestDate.getDate() - i);

            const isoDate = date
              .toISOString()
              .split("T")[0];

            const existing = trend.find(
              (item) => item.day === isoDate
            );

            sevenDays.push({
              day: isoDate,
              displayDay: date.toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                }
              ),
              fraud: existing
                ? existing.fraud
                : 0,
            });
          }

          setData(sevenDays);
        } else {
          setData([]);
        }

      } catch (error) {
        console.error(
          "Failed to load fraud trend:",
          error
        );
      }
    }

    loadTrend();
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6">

      {/* ================= HEADER ================= */}

      <div className="mb-5">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">

            <span className="text-blue-600 text-xl">
              📈
            </span>

          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Fraud Trend
          </h2>

        </div>

        <p className="text-slate-500 text-sm mt-1 ml-12">
          Last 7 Days Overview
        </p>

      </div>

      {/* ================= CHART ================= */}

      <ResponsiveContainer
        width="100%"
        height={270}
      >

        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >

          <defs>

            <linearGradient
              id="fraudAreaGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="0%"
                stopColor="#2563eb"
                stopOpacity={0.20}
              />

              <stop
                offset="100%"
                stopColor="#2563eb"
                stopOpacity={0.02}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            stroke="#e2e8f0"
            strokeDasharray="3 4"
            vertical={true}
          />

          <XAxis
            dataKey="displayDay"
            tick={{
              fill: "#64748b",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            domain={[0, "auto"]}
            tick={{
              fill: "#64748b",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
            width={35}
          />

          <Tooltip
            cursor={{
              stroke: "#cbd5e1",
              strokeDasharray: "4 4",
            }}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              backgroundColor: "#ffffff",
              boxShadow:
                "0 10px 30px rgba(15,23,42,0.12)",
            }}
            labelStyle={{
              color: "#0f172a",
              fontWeight: 700,
            }}
            formatter={(value) => [
              `${value}`,
              "Fraud Cases",
            ]}
          />

          {/* Light blue area under the line */}

          <Area
            type="monotone"
            dataKey="fraud"
            stroke="none"
            fill="url(#fraudAreaGradient)"
          />

          {/* Main blue line */}

          <Line
            type="monotone"
            dataKey="fraud"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#2563eb",
              stroke: "#ffffff",
              strokeWidth: 3,
            }}
            activeDot={{
              r: 7,
              fill: "#2563eb",
              stroke: "#ffffff",
              strokeWidth: 3,
            }}
            animationDuration={1000}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}