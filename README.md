# 🏦 Bank Fraud Detection Platform

> An AI-powered fraud detection platform that uses Machine Learning to detect fraudulent financial transactions in real time.

---

## 📸 Dashboard Preview

> Add screenshots here after deployment.

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Prediction

![Prediction](screenshots/prediction.png)

### Analytics

![Analytics](screenshots/analytics.png)

### History

![History](screenshots/history.png)

---

# 🚀 Features

✅ AI Fraud Detection using XGBoost

✅ FastAPI REST API

✅ React Dashboard

✅ PostgreSQL Database

✅ Prediction History

✅ Dashboard Analytics

✅ Fraud Trend Charts

✅ Fraud Distribution Charts

✅ Search Transactions

✅ Filter Predictions

✅ Pagination

✅ CSV Export

✅ PDF Report Export

✅ Toast Notifications

✅ Responsive Design

---

# 🧠 Machine Learning

The fraud detection model was trained using supervised machine learning with XGBoost.

### Features used

- Transaction Type
- Amount
- Sender Balance Before
- Sender Balance After
- Receiver Balance Before
- Receiver Balance After
- Flagged Fraud

### Output

- Legitimate
- Fraud

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Recharts
- Framer Motion
- React Icons
- React Hot Toast

---

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- Uvicorn

---

## Machine Learning

- XGBoost
- Scikit-learn
- Pandas
- NumPy

---

## Deployment

Frontend

- Vercel

Backend

- Render

Database

- Render PostgreSQL

---

# 📂 Project Structure

```
Bank-Fraud-Detection/

│

├── backend/

│   ├── api/

│   ├── database/

│   ├── services/

│   ├── training/

│   ├── models_saved/

│   └── main.py

│

├── frontend/

│   ├── components/

│   ├── charts/

│   ├── layouts/

│   ├── pages/

│   └── services/

│

└── README.md
```

---

# ⚙ Installation

## Clone the repository

```bash
git clone https://github.com/57KayBel0/Bank-Fraud-Detection.git

cd Bank-Fraud-Detection
```

---

## Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend URL

```
http://localhost:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# API Endpoints

## Predict

```
POST /predict
```

Example

```json
{
    "type":"TRANSFER",
    "amount":5000,
    "oldbalanceOrg":9000,
    "newbalanceOrig":4000,
    "oldbalanceDest":1000,
    "newbalanceDest":6000,
    "isFlaggedFraud":0
}
```

---

## Dashboard

```
GET /dashboard
```

---

## Prediction History

```
GET /history
```

---

## Charts

```
GET /charts
```

---

## Fraud Trend

```
GET /fraud-trend
```

---

# 📊 Dashboard Features

- Real-time predictions
- Fraud analytics
- Interactive charts
- AI confidence scores
- Search
- Filter
- Pagination
- CSV export
- PDF reports

---

# 💻 Screenshots

Replace these placeholders after deployment.

```
screenshots/

dashboard.png

prediction.png

history.png

analytics.png
```

---

# 📈 Future Improvements

- User Authentication
- Role-Based Access Control
- Email Alerts
- Real-Time Streaming Predictions
- Docker Support
- Kubernetes Deployment
- CI/CD Pipeline
- Explainable AI (SHAP)
- Audit Logs

---

# 👨‍💻 Author

**Kabelo Makgae**

Data Scientist • Machine Learning Engineer • Full Stack Developer

GitHub

https://github.com/57KayBel0

LinkedIn

www.linkedin.com/in/kabelo-makgae-37122b270

---

# ⭐ If you found this project interesting

Please consider giving the repository a ⭐.