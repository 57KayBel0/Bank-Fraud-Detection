import { NavLink } from "react-router-dom";

import {
  FaChartPie,
  FaExchangeAlt,
  FaBell,
  FaUsers,
  FaChartLine,
  FaRobot,
  FaFileAlt,
  FaCog,
  FaShieldAlt,
  FaDatabase,
  FaChevronRight,
} from "react-icons/fa";

const menu = [
  {
    title: "Dashboard",
    path: "/",
    icon: <FaChartPie />,
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: <FaExchangeAlt />,
  },
  {
    title: "Fraud Alerts",
    path: "/alerts",
    icon: <FaBell />,
  },
  {
    title: "Customers",
    path: "/customers",
    icon: <FaUsers />,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: <FaChartLine />,
  },
  {
    title: "AI Model",
    path: "/models",
    icon: <FaRobot />,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <FaFileAlt />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <FaCog />,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white shadow-2xl flex flex-col">

      {/* Logo */}

      <div className="h-24 flex items-center gap-4 px-8 border-b border-slate-700">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-2xl shadow-lg">
          <FaShieldAlt />
        </div>

        <div>
          <h1 className="font-bold text-xl">
            BFD Platform
          </h1>

          <p className="text-slate-400">
            AI Fraud Detection
          </p>
        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 mt-8 px-5">

        {menu.map((item) => (

          <NavLink
            key={item.title}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `w-full flex items-center justify-between px-5 py-4 rounded-2xl mb-3 transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg"
                  : "hover:bg-slate-700"
              }`
            }
          >

            <div className="flex items-center gap-4">

              <span className="text-xl">
                {item.icon}
              </span>

              <span>{item.title}</span>

            </div>

            <FaChevronRight className="opacity-60" />

          </NavLink>

        ))}

      </nav>

      {/* AI Status */}

      <div className="m-5 rounded-3xl bg-slate-800 p-5 border border-slate-700">

        <div className="flex items-center gap-3 mb-4">

          <FaRobot className="text-cyan-400 text-2xl" />

          <div>

            <h3 className="font-bold">
              AI Engine
            </h3>

            <p className="text-sm text-slate-400">
              XGBoost Model
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3 mb-3">

          <FaDatabase className="text-green-400" />

          <span className="text-sm">
            PostgreSQL Connected
          </span>

        </div>

        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">

          <div className="w-full h-full bg-gradient-to-r from-green-400 to-cyan-400" />

        </div>

        <p className="text-xs mt-2 text-slate-400">
          AI Status: Operational
        </p>

      </div>

    </aside>
  );
}