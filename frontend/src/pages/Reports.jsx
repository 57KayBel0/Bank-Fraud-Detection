import DashboardLayout from "../layouts/DashboardLayout";
import {
  FaFilePdf,
  FaFileCsv,
  FaChartBar,
  FaDownload,
} from "react-icons/fa";

export default function Reports() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Reports
          </h1>

          <p className="text-slate-500 mt-2">
            Generate and download fraud analysis reports.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <FaChartBar className="text-blue-600 text-4xl mb-4" />

            <h2 className="text-xl font-bold">
              Fraud Summary
            </h2>

            <p className="text-slate-500 mt-2">
              View executive fraud statistics and KPIs.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <FaFileCsv className="text-green-600 text-4xl mb-4" />

            <h2 className="text-xl font-bold">
              CSV Export
            </h2>

            <p className="text-slate-500 mt-2">
              Export all prediction history as CSV.
            </p>

            <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition flex items-center gap-2">
              <FaDownload />
              Export CSV
            </button>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <FaFilePdf className="text-red-600 text-4xl mb-4" />

            <h2 className="text-xl font-bold">
              PDF Report
            </h2>

            <p className="text-slate-500 mt-2">
              Download a printable fraud analysis report.
            </p>

            <button className="mt-6 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition flex items-center gap-2">
              <FaDownload />
              Export PDF
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}