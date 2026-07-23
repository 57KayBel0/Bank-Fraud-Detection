import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">

      <div>

        <h1 className="text-2xl font-bold text-slate-800">
          Bank Fraud Detection Dashboard
        </h1>

        <p className="text-slate-500">
          AI Powered Financial Security
        </p>

      </div>

      <div className="flex items-center gap-6">

        <FaBell className="text-xl text-slate-500 cursor-pointer hover:text-cyan-500" />

        <div className="flex items-center gap-3">

          <FaUserCircle className="text-4xl text-cyan-600" />

          <div>

            <h2 className="font-semibold">
              Kabelo
            </h2>

            <p className="text-sm text-slate-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}