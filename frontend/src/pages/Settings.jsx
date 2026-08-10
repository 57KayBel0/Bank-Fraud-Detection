import DashboardLayout from "../layouts/DashboardLayout";

export default function Settings() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Settings
          </h1>

          <p className="text-slate-500 mt-2">
            Configure your fraud detection platform.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="space-y-6">

            <div>

              <label className="font-semibold block mb-2">
                System Name
              </label>

              <input
                type="text"
                defaultValue="Bank Fraud Detection Platform"
                className="border rounded-xl p-3 w-full"
              />

            </div>

            <div>

              <label className="font-semibold block mb-2">
                AI Model
              </label>

              <input
                type="text"
                defaultValue="XGBoost"
                className="border rounded-xl p-3 w-full"
              />

            </div>

            <div>

              <label className="font-semibold block mb-2">
                Notification Email
              </label>

              <input
                type="email"
                placeholder="admin@bank.com"
                className="border rounded-xl p-3 w-full"
              />

            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">
              Save Settings
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}