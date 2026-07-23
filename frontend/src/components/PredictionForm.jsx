import { useState } from "react";
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
    try {
      const response = await api.post("/predict", form);

      setResult(response.data);
      onPrediction({
        type: form.type,
        amount: form.amount,
        prediction: response.data.prediction,
        probability: `${Math.round(response.data.probability * 100)}%`,
    });

    } catch (error) {
      console.error(error);
      alert("Prediction failed.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Predict Transaction
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option>TRANSFER</option>
          <option>CASH_OUT</option>
          <option>PAYMENT</option>
          <option>DEBIT</option>
          <option>CASH_IN</option>
        </select>

        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="border rounded-lg p-3"
        />

        <input
          type="number"
          name="oldbalanceOrg"
          value={form.oldbalanceOrg}
          onChange={handleChange}
          placeholder="Old Balance Origin"
          className="border rounded-lg p-3"
        />

        <input
          type="number"
          name="newbalanceOrig"
          value={form.newbalanceOrig}
          onChange={handleChange}
          placeholder="New Balance Origin"
          className="border rounded-lg p-3"
        />

        <input
          type="number"
          name="oldbalanceDest"
          value={form.oldbalanceDest}
          onChange={handleChange}
          placeholder="Old Balance Destination"
          className="border rounded-lg p-3"
        />

        <input
          type="number"
          name="newbalanceDest"
          value={form.newbalanceDest}
          onChange={handleChange}
          placeholder="New Balance Destination"
          className="border rounded-lg p-3"
        />

      </div>

      <button
        onClick={predict}
        className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold"
      >
        Predict Transaction
      </button>

      {result && (
        <div className="mt-8 border-t pt-6">

          <h3 className="text-xl font-bold">
            Prediction Result
          </h3>

          <p className="mt-3">
            <strong>Status:</strong> {result.prediction}
          </p>

          <p>
            <strong>Probability:</strong> {result.probability}
          </p>

        </div>
      )}
    </div>
  );
}