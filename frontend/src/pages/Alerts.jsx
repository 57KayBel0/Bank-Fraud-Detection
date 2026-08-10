import DashboardLayout from "../layouts/DashboardLayout";
import {
  FaExclamationTriangle,
  FaShieldAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

const alerts = [
  {
    id: 1,
    customer: "Customer #1001",
    amount: "R 125,000",
    type: "TRANSFER",
    risk: "High",
    location: "Johannesburg",
    time: "2 minutes ago",
  },
  {
    id: 2,
    customer: "Customer #2084",
    amount: "R 89,500",
    type: "CASH_OUT",
    risk: "High",
    location: "Pretoria",
    time: "15 minutes ago",
  },
  {
    id: 3,
    customer: "Customer #3910",
    amount: "R 45,800",
    type: "TRANSFER",
    risk: "Medium",
    location: "Cape Town",
    time: "32 minutes ago",
  },
];

export default function Alerts() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Fraud Alerts
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor suspicious transactions requiring investigation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-red-100 rounded-2xl p-6 shadow">
            <FaExclamationTriangle className="text-red-600 text-3xl mb-3" />
            <p className="text-slate-600">High Risk Alerts</p>
            <h2 className="text-3xl font-bold">18</h2>
          </div>

          <div className="bg-yellow-100 rounded-2xl p-6 shadow">
            <FaShieldAlt className="text-yellow-600 text-3xl mb-3" />
            <p className="text-slate-600">Under Review</p>
            <h2 className="text-3xl font-bold">9</h2>
          </div>

          <div className="bg-green-100 rounded-2xl p-6 shadow">
            <FaShieldAlt className="text-green-600 text-3xl mb-3" />
            <p className="text-slate-600">Resolved Today</p>
            <h2 className="text-3xl font-bold">42</h2>
          </div>

        </div>

        <div className="space-y-5">

          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-red-500"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

                <div>
                  <h2 className="text-xl font-bold">
                    {alert.customer}
                  </h2>

                  <p className="text-slate-500 mt-1">
                    {alert.type} • {alert.amount}
                  </p>
                </div>

                <div className="flex gap-6 flex-wrap">

                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    {alert.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaClock className="text-blue-500" />
                    {alert.time}
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${
                      alert.risk === "High"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {alert.risk} Risk
                  </span>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}