import DashboardLayout from "../layouts/DashboardLayout";
import {
  FaRobot,
  FaBullseye,
  FaDatabase,
  FaBrain,
  FaChartBar,
  FaCodeBranch,
} from "react-icons/fa";

export default function Models() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold">
            AI Fraud Detection Model
          </h1>

          <p className="text-slate-500 mt-2">
            Machine learning model performance and deployment information.
          </p>
        </div>

        {/* KPI Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaRobot className="text-purple-600 text-3xl mb-3" />
            <p className="text-slate-500">Model</p>
            <h2 className="text-2xl font-bold">
              XGBoost
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaBullseye className="text-green-600 text-3xl mb-3" />
            <p className="text-slate-500">Accuracy</p>
            <h2 className="text-2xl font-bold">
              99.97%
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaDatabase className="text-blue-600 text-3xl mb-3" />
            <p className="text-slate-500">Dataset</p>
            <h2 className="text-2xl font-bold">
              6.3M+
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaBrain className="text-red-600 text-3xl mb-3" />
            <p className="text-slate-500">Status</p>
            <h2 className="text-2xl font-bold text-green-600">
              Active
            </h2>
          </div>

        </div>

        {/* Metrics */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Model Performance
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-slate-100 rounded-xl p-5">
              <p className="text-slate-500">Precision</p>
              <h3 className="text-3xl font-bold">99.8%</h3>
            </div>

            <div className="bg-slate-100 rounded-xl p-5">
              <p className="text-slate-500">Recall</p>
              <h3 className="text-3xl font-bold">99.6%</h3>
            </div>

            <div className="bg-slate-100 rounded-xl p-5">
              <p className="text-slate-500">F1 Score</p>
              <h3 className="text-3xl font-bold">99.7%</h3>
            </div>

            <div className="bg-slate-100 rounded-xl p-5">
              <p className="text-slate-500">ROC-AUC</p>
              <h3 className="text-3xl font-bold">0.999</h3>
            </div>

          </div>

        </div>

        {/* Technical Details */}

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">
              Technical Information
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Algorithm</span>
                <span className="font-semibold">XGBoost</span>
              </div>

              <div className="flex justify-between">
                <span>Programming Language</span>
                <span className="font-semibold">Python</span>
              </div>

              <div className="flex justify-between">
                <span>Framework</span>
                <span className="font-semibold">FastAPI</span>
              </div>

              <div className="flex justify-between">
                <span>Database</span>
                <span className="font-semibold">PostgreSQL</span>
              </div>

              <div className="flex justify-between">
                <span>Deployment</span>
                <span className="font-semibold">Render</span>
              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">
              Feature Importance
            </h2>

            <div className="space-y-5">

              <div>
                <div className="flex justify-between">
                  <span>Amount</span>
                  <span>92%</span>
                </div>

                <div className="h-3 bg-slate-200 rounded-full mt-2">
                  <div className="h-3 w-[92%] bg-blue-600 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>Transaction Type</span>
                  <span>87%</span>
                </div>

                <div className="h-3 bg-slate-200 rounded-full mt-2">
                  <div className="h-3 w-[87%] bg-green-600 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>Sender Balance</span>
                  <span>81%</span>
                </div>

                <div className="h-3 bg-slate-200 rounded-full mt-2">
                  <div className="h-3 w-[81%] bg-purple-600 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>Receiver Balance</span>
                  <span>76%</span>
                </div>

                <div className="h-3 bg-slate-200 rounded-full mt-2">
                  <div className="h-3 w-[76%] bg-red-600 rounded-full"></div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}