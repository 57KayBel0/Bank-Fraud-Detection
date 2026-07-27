import { useState } from "react";

import { CSVLink } from "react-csv";
import { exportPredictionPDF } from "../utils/exportPDF";
import { FaFilePdf } from "react-icons/fa";
import {
  FaExchangeAlt,
  FaSearch,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileCsv,
} from "react-icons/fa";

const ITEMS_PER_PAGE = 10;

export default function PredictionHistory({ history }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  // Search & Filter
  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.transaction_type
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      item.prediction === filter;

    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(
    filteredHistory.length / ITEMS_PER_PAGE
  );

  const start = (page - 1) * ITEMS_PER_PAGE;

  const currentItems = filteredHistory.slice(
    start,
    start + ITEMS_PER_PAGE
  );

  // CSV Export
  const csvData = filteredHistory.map((item) => ({
    "Transaction Type": item.transaction_type,
    Amount: item.amount,
    Prediction: item.prediction,
    Confidence: `${(item.probability * 100).toFixed(2)}%`,
    Date: new Date(item.created_at).toLocaleString(),
  }));

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-8">

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Prediction History
          </h2>

          <p className="text-slate-500 mt-2">
            {filteredHistory.length} transaction(s)
          </p>

        </div>

        <div className="flex flex-col md:flex-row gap-3">

          {/* Search */}

          <div className="relative">

            <FaSearch
              className="absolute left-3 top-4 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search transaction..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="
                pl-10
                pr-4
                py-3
                border
                rounded-xl
                focus:ring-2
                focus:ring-blue-500
                outline-none
              "
            />

          </div>

          {/* Filter */}

          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            className="
              px-4
              py-3
              border
              rounded-xl
              focus:ring-2
              focus:ring-blue-500
            "
          >
            <option>All</option>
            <option>Fraud</option>
            <option>Legitimate</option>
          </select>

          {/* Export CSV */}

          <CSVLink
            data={csvData}
            filename={`fraud_predictions_${new Date()
              .toISOString()
              .slice(0, 10)}.csv`}
            className="
              flex
              items-center
              gap-2
              bg-green-600
              hover:bg-green-700
              text-white
              px-5
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            <FaFileCsv />

            Export CSV

          </CSVLink>
          
          <button
            onClick={() =>
              exportPredictionPDF(history, {
                transactions: history.length,
                fraud_cases: history.filter(
                  (x) => x.prediction === "Fraud"
                ).length,
                legitimate_cases: history.filter(
                  (x) => x.prediction === "Legitimate"
                ).length,
                fraud_rate:
                  history.length === 0
                    ? 0
                    : (
                        (history.filter(
                          (x) => x.prediction === "Fraud"
                        ).length /
                          history.length) *
                        100
                      ).toFixed(2),
                model: "XGBoost",
                model_accuracy: 99.97,
              })
            }
            className="
              flex
              items-center
              gap-2
              bg-red-600
              hover:bg-red-700
              text-white
              px-5
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            <FaFilePdf />

            Export PDF
          </button>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto rounded-2xl">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">
                Transaction
              </th>

              <th className="text-left p-4">
                Amount
              </th>

              <th className="text-left p-4">
                Prediction
              </th>

              <th className="text-left p-4">
                Confidence
              </th>

              <th className="text-left p-4">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {currentItems.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-12 text-slate-400"
                >
                  No transactions found.
                </td>

              </tr>

            ) : (

              currentItems.map((item) => (

                <tr
                  key={item.id}
                  className="
                    border-b
                    hover:bg-slate-50
                    transition
                  "
                >

                  {/* Transaction */}

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-10
                          h-10
                          rounded-xl
                          bg-blue-100
                          flex
                          items-center
                          justify-center
                        "
                      >

                        <FaExchangeAlt className="text-blue-600" />

                      </div>

                      <span className="font-semibold">

                        {item.transaction_type}

                      </span>

                    </div>

                  </td>

                  {/* Amount */}

                  <td className="font-semibold">

                    R {Number(item.amount).toLocaleString()}

                  </td>

                  {/* Prediction */}

                  <td>

                    {item.prediction === "Fraud" ? (

                      <span
                        className="
                          inline-flex
                          items-center
                          gap-2
                          bg-red-100
                          text-red-700
                          px-4
                          py-2
                          rounded-full
                          font-semibold
                        "
                      >

                        <FaExclamationTriangle />

                        Fraud

                      </span>

                    ) : (

                      <span
                        className="
                          inline-flex
                          items-center
                          gap-2
                          bg-green-100
                          text-green-700
                          px-4
                          py-2
                          rounded-full
                          font-semibold
                        "
                      >

                        <FaCheckCircle />

                        Legitimate

                      </span>

                    )}

                  </td>

                  {/* Confidence */}

                  <td>

                    <span className="font-bold text-blue-600">

                      {(item.probability * 100).toFixed(2)}%

                    </span>

                  </td>

                  {/* Date */}

                  <td className="text-slate-500">

                    {new Date(
                      item.created_at
                    ).toLocaleString()}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Pagination */}

      <div className="flex justify-between items-center mt-8">

        <button
          onClick={() =>
            setPage((p) => Math.max(p - 1, 1))
          }
          disabled={page === 1}
          className="
            px-5
            py-3
            rounded-xl
            bg-slate-200
            hover:bg-slate-300
            disabled:opacity-40
          "
        >
          ← Previous
        </button>

        <div className="font-semibold text-slate-700">

          Page {page} of {Math.max(totalPages, 1)}

        </div>

        <button
          onClick={() =>
            setPage((p) =>
              Math.min(p + 1, totalPages)
            )
          }
          disabled={
            page === totalPages ||
            totalPages === 0
          }
          className="
            px-5
            py-3
            rounded-xl
            bg-blue-600
            text-white
            hover:bg-blue-700
            disabled:opacity-40
          "
        >
          Next →
        </button>

      </div>

    </div>
  );
}