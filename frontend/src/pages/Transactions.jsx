import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PredictionForm from "../components/PredictionForm";
import PredictionHistory from "../components/PredictionHistory";
import api from "../services/api";

export default function Transactions() {

  const [history, setHistory] = useState([]);

  const loadHistory = async () => {

    try {

      const response = await api.get("/history");

      setHistory(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadHistory();

  }, []);

  const addPrediction = async () => {

    await loadHistory();

  };

  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Transactions
          </h1>

          <p className="text-slate-500 mt-2">
            Analyse banking transactions and review prediction history.
          </p>

        </div>

        <PredictionForm
          onPrediction={addPrediction}
        />

        <PredictionHistory
          history={history}
        />

      </div>

    </DashboardLayout>

  );
}