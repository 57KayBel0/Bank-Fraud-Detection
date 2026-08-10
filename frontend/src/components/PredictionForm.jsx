import { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

export default function PredictionForm({ onPrediction }) {
  const [form, setForm] = useState({
    type: "TRANSFER",
    amount: 5000,
    oldbalanceOrg: 9000,
    newbalanceOrig: 4000,
    oldbalanceDest: 1000,
    newbalanceDest: 6000,
    isFlaggedFraud: 0,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "type"
          ? e.target.value
          : Number(e.target.value),
    });
  };

  const predict = async () => {
    setLoading(true);

    try {
      const response = await api.post("/predict", form);

      setResult(response.data);

      if (response.data.prediction === "Fraud") {
        toast.error("🚨 Fraudulent transaction detected!");
      } else {
        toast.success("✅ Legitimate transaction");
      }

      onPrediction({
        type: form.type,
        amount: form.amount,
        prediction: response.data.prediction,
        probability: `${Math.round(response.data.probability * 100)}%`,
      });

    } catch (error) {
      console.error(error);
      toast.error("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        🔍 Analyze Transaction
      </h2>

      <p className="text-gray-500 mb-8">
        Enter transaction details below to detect possible fraud.
      </p>

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="block mb-2 font-semibold">
            Transaction Type
          </label>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border rounded-xl p-3 w-full"
          >
            <option>TRANSFER</option>
            <option>CASH_OUT</option>
            <option>PAYMENT</option>
            <option>DEBIT</option>
            <option>CASH_IN</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="border rounded-xl p-3 w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Sender Balance Before
          </label>

          <input
            type="number"
            name="oldbalanceOrg"
            value={form.oldbalanceOrg}
            onChange={handleChange}
            className="border rounded-xl p-3 w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Sender Balance After
          </label>

          <input
            type="number"
            name="newbalanceOrig"
            value={form.newbalanceOrig}
            onChange={handleChange}
            className="border rounded-xl p-3 w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Receiver Balance Before
          </label>

          <input
            type="number"
            name="oldbalanceDest"
            value={form.oldbalanceDest}
            onChange={handleChange}
            className="border rounded-xl p-3 w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Receiver Balance After
          </label>

          <input
            type="number"
            name="newbalanceDest"
            value={form.newbalanceDest}
            onChange={handleChange}
            className="border rounded-xl p-3 w-full"
          />
        </div>

      </div>

      <button
        onClick={predict}
        disabled={loading}
        className={`w-full mt-8 rounded-xl p-4 text-lg font-bold text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading
          ? "⏳ Analyzing Transaction..."
          : "🔍 Analyze Transaction"}
      </button>

      {result && (
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Prediction Result
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div
              className={`rounded-2xl p-6 text-center text-white ${
                result.prediction === "Fraud"
                  ? "bg-red-600"
                  : "bg-green-600"
              }`}
            >
              <h3 className="text-lg font-semibold">
                Status
              </h3>

              <p className="text-3xl font-bold mt-4">
                {result.prediction === "Fraud"
                  ? "🚨 Fraud"
                  : "✅ Legitimate"}
              </p>

            </div>

            <div className="rounded-2xl bg-blue-50 p-6 text-center">

              <h3 className="text-lg font-semibold">
                Confidence
              </h3>

              <p className="text-5xl font-bold text-blue-700 mt-4">
                {(result.probability * 100).toFixed(1)}%
              </p>

            </div>

            <div
              className={`rounded-2xl p-6 text-center ${
                result.prediction === "Fraud"
                  ? "bg-red-100"
                  : "bg-green-100"
              }`}
            >

              <h3 className="text-lg font-semibold">
                Risk Level
              </h3>

              <p
                className={`text-4xl font-bold mt-4 ${
                  result.prediction === "Fraud"
                    ? "text-red-700"
                    : "text-green-700"
                }`}
              >
                {result.prediction === "Fraud"
                  ? "HIGH"
                  : "LOW"}
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}