import {
  FaChartPie,
  FaShieldAlt,
  FaHistory,
  FaCog,
  FaUniversity,
} from "react-icons/fa";

const menu = [
  {
    title: "Dashboard",
    icon: <FaChartPie />,
  },
  {
    title: "Predictions",
    icon: <FaShieldAlt />,
  },
  {
    title: "History",
    icon: <FaHistory />,
  },
  {
    title: "Settings",
    icon: <FaCog />,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-950 text-white shadow-2xl">

      {/* Logo */}

      <div className="h-20 flex items-center gap-3 px-8 border-b border-slate-800">

        <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center text-xl">

          <FaUniversity />

        </div>

        <div>

          <h1 className="font-bold text-lg">
            AI Bank
          </h1>

          <p className="text-slate-400 text-sm">
            Fraud Detection
          </p>

        </div>

      </div>

      {/* Menu */}

      <nav className="mt-8 px-4">

        {menu.map((item) => (
          <button
            key={item.title}
            className="
              w-full
              flex
              items-center
              gap-4
              px-5
              py-4
              mb-3
              rounded-xl
              text-slate-300
              hover:bg-cyan-500
              hover:text-white
              transition-all
              duration-300
            "
          >
            <span className="text-lg">

              {item.icon}

            </span>

            {item.title}

          </button>
        ))}

      </nav>

    </aside>
  );
}