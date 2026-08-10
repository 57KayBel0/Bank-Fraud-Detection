import DashboardLayout from "../layouts/DashboardLayout";
import {
  FaUser,
  FaShieldAlt,
  FaExchangeAlt,
  FaExclamationTriangle,
  FaSearch,
} from "react-icons/fa";

const customers = [
  {
    id: 1001,
    name: "John Smith",
    account: "Savings",
    transactions: 254,
    risk: "Low",
    status: "Active",
  },
  {
    id: 1002,
    name: "Sarah Johnson",
    account: "Current",
    transactions: 587,
    risk: "High",
    status: "Flagged",
  },
  {
    id: 1003,
    name: "Michael Brown",
    account: "Business",
    transactions: 1023,
    risk: "Medium",
    status: "Monitoring",
  },
  {
    id: 1004,
    name: "Emily Davis",
    account: "Savings",
    transactions: 184,
    risk: "Low",
    status: "Active",
  },
];

export default function Customers() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

          <div>
            <h1 className="text-4xl font-bold">
              Customer Management
            </h1>

            <p className="text-slate-500 mt-2">
              Monitor customer activity and fraud risk.
            </p>
          </div>

          <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search customer..."
              className="pl-11 pr-4 py-3 rounded-xl border w-72 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

        </div>

        {/* Summary Cards */}

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaUser className="text-blue-600 text-3xl mb-3" />
            <p className="text-slate-500">Customers</p>
            <h2 className="text-3xl font-bold">4,823</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaExchangeAlt className="text-green-600 text-3xl mb-3" />
            <p className="text-slate-500">Transactions</p>
            <h2 className="text-3xl font-bold">125K</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaShieldAlt className="text-blue-600 text-3xl mb-3" />
            <p className="text-slate-500">Safe Accounts</p>
            <h2 className="text-3xl font-bold">4,731</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaExclamationTriangle className="text-red-600 text-3xl mb-3" />
            <p className="text-slate-500">Flagged</p>
            <h2 className="text-3xl font-bold">92</h2>
          </div>

        </div>

        {/* Customer Table */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left p-5">Customer</th>
                <th className="text-left p-5">Account</th>
                <th className="text-left p-5">Transactions</th>
                <th className="text-left p-5">Risk</th>
                <th className="text-left p-5">Status</th>

              </tr>

            </thead>

            <tbody>

              {customers.map((customer) => (

                <tr
                  key={customer.id}
                  className="border-b hover:bg-slate-50 transition"
                >

                  <td className="p-5 font-semibold">
                    {customer.name}
                  </td>

                  <td>{customer.account}</td>

                  <td>{customer.transactions}</td>

                  <td>

                    <span
                      className={`px-4 py-2 rounded-full font-semibold ${
                        customer.risk === "High"
                          ? "bg-red-100 text-red-700"
                          : customer.risk === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {customer.risk}
                    </span>

                  </td>

                  <td>

                    <span
                      className={`px-4 py-2 rounded-full font-semibold ${
                        customer.status === "Flagged"
                          ? "bg-red-100 text-red-700"
                          : customer.status === "Monitoring"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {customer.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </DashboardLayout>
  );
}