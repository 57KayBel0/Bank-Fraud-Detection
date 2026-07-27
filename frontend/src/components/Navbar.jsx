import {
  FaBell,
  FaUserCircle,
  FaCalendarAlt,
  FaCircle,
} from "react-icons/fa";

export default function Navbar() {
  const today = new Date().toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="h-24 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 flex justify-between items-center shadow-sm">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          🏦 Bank Fraud Detection Platform
        </h1>

        <div className="flex items-center gap-4 mt-2 text-slate-500">

          <span className="flex items-center gap-2">
            <FaCalendarAlt />
            {today}
          </span>

          <span className="flex items-center gap-2 text-green-600">
            <FaCircle className="text-xs" />
            AI System Online
          </span>

        </div>

      </div>

      <div className="flex items-center gap-6">

        <button
          className="
            relative
            w-12
            h-12
            rounded-full
            bg-slate-100
            hover:bg-blue-100
            transition
          "
        >

          <FaBell className="mx-auto text-slate-600 text-xl mt-3" />

          <span
            className="
              absolute
              top-2
              right-2
              w-2
              h-2
              rounded-full
              bg-red-500
            "
          />

        </button>

        <div className="flex items-center gap-3">

          <FaUserCircle className="text-5xl text-blue-600" />

          <div>

            <h2 className="font-bold text-slate-800">
              Kabelo Makgae
            </h2>

            <p className="text-slate-500 text-sm">
              System Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}