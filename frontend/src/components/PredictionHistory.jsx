import { useState } from "react";

const ITEMS_PER_PAGE = 10;

export default function PredictionHistory({ history }) {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const filteredHistory = history.filter((item) => {

    const matchesSearch = item.transaction_type
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      item.prediction === filter;

    return matchesSearch && matchesFilter;

  });

  const totalPages = Math.ceil(
    filteredHistory.length / ITEMS_PER_PAGE
  );

  const start = (page - 1) * ITEMS_PER_PAGE;

  const currentItems = filteredHistory.slice(
    start,
    start + ITEMS_PER_PAGE
  );

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

        <h2 className="text-2xl font-bold">

          Prediction History

        </h2>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Search transaction..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2"
          />

          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2"
          >
            <option>All</option>
            <option>Fraud</option>
            <option>Legitimate</option>
          </select>

        </div>

      </div>

      <table className="w-full">

        <thead className="border-b">

          <tr className="text-left">

            <th className="py-3">Type</th>
            <th>Amount</th>
            <th>Prediction</th>
            <th>Confidence</th>
            <th>Date</th>

          </tr>

        </thead>

        <tbody>

          {currentItems.length === 0 ? (

            <tr>

              <td
                colSpan="5"
                className="text-center py-8 text-slate-500"
              >
                No matching records found.
              </td>

            </tr>

          ) : (

            currentItems.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="py-4">
                  {item.transaction_type}
                </td>

                <td>
                  R {Number(item.amount).toLocaleString()}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      item.prediction === "Fraud"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {item.prediction}
                  </span>

                </td>

                <td>
                  {(item.probability * 100).toFixed(2)}%
                </td>

                <td>
                  {new Date(item.created_at).toLocaleString()}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      <div className="flex justify-between items-center mt-6">

        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-slate-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>

          Page {page} of {Math.max(totalPages, 1)}

        </span>

        <button
          onClick={() =>
            setPage((p) => Math.min(p + 1, totalPages))
          }
          disabled={page === totalPages || totalPages === 0}
          className="px-4 py-2 bg-slate-200 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>

  );

}