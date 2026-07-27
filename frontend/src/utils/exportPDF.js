import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportPredictionPDF(history, stats) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(22);
  doc.setTextColor(30, 64, 175);
  doc.text("Bank Fraud Detection Report", 14, 20);

  // Subtitle
  doc.setFontSize(11);
  doc.setTextColor(100);

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    28
  );

  // Summary
  doc.setFontSize(15);
  doc.setTextColor(0);
  doc.text("Dashboard Summary", 14, 42);

  doc.setFontSize(11);

  doc.text(
    `Total Transactions: ${stats.transactions}`,
    14,
    52
  );

  doc.text(
    `Fraud Cases: ${stats.fraud_cases}`,
    14,
    60
  );

  doc.text(
    `Legitimate Cases: ${stats.legitimate_cases}`,
    14,
    68
  );

  doc.text(
    `Fraud Rate: ${stats.fraud_rate}%`,
    14,
    76
  );

  doc.text(
    `AI Model: ${stats.model}`,
    14,
    84
  );

  doc.text(
    `Model Accuracy: ${stats.model_accuracy}%`,
    14,
    92
  );

  // Table

  autoTable(doc, {
    startY: 105,

    head: [[
      "Type",
      "Amount",
      "Prediction",
      "Confidence",
      "Date",
    ]],

    body: history.map((item) => [
      item.transaction_type,
      `R ${Number(item.amount).toLocaleString()}`,
      item.prediction,
      `${(item.probability * 100).toFixed(2)}%`,
      new Date(item.created_at).toLocaleString(),
    ]),

    headStyles: {
      fillColor: [37, 99, 235],
    },

    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },

    styles: {
      fontSize: 10,
    },
  });

  doc.save(
    `Fraud_Report_${new Date()
      .toISOString()
      .slice(0, 10)}.pdf`
  );
}