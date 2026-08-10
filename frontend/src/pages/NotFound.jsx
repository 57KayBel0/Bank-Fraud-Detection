import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white shadow-xl rounded-3xl p-12 text-center max-w-lg">

        <FaExclamationTriangle className="text-7xl text-red-500 mx-auto mb-6" />

        <h1 className="text-6xl font-bold text-slate-800">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-slate-500 mt-4">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-3 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
        >
          <FaHome />
          Back to Dashboard
        </Link>

      </div>

    </div>
  );
}