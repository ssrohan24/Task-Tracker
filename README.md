# 🚀 Task Tracker (MERN Stack Project)

A full-stack Project & Issue Tracking system built using the MERN stack.
Users can manage projects, create issues, assign tasks, and track progress.

---

## 🌐 Live Demo

👉 Frontend: https://task-tracker-brown-ten.vercel.app

👉 Backend API: https://task-tracker-pk81.onrender.com

⚠️ Note: Backend may take 20–30 seconds to respond (free hosting sleep mode)

---

## 🔥 Features

* 🔐 Authentication (JWT Login/Register)
* 📁 Project Management (CRUD)
* 🐞 Issue Tracking (assign, status, priority)
* 📊 Dashboard with stats
* 🔎 Filters (status, priority, project)
* 👥 Role-based system (Admin / Member)

---

## 🛠 Tech Stack

* Frontend: React.js, Axios
* Backend: Node.js, Express.js
* Database: MongoDB Atlas
* Auth: JWT

---

## 📁 Project Structure

TaskTracker/
├── backend/
├── frontend/
├── README.md

---

# ⚙️ LOCAL SETUP (RUN ON YOUR SYSTEM)

## 1️⃣ Clone repo

```bash
git clone https://github.com/ssrohan24/Task-Tracker.git
cd Task-Tracker
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔥 IMPORTANT (VERY IMPORTANT)

If running locally, update:

📄 `frontend/src/api/axios.js`

```js
baseURL: "http://localhost:5000/api"
```

---

## 🌐 FOR PRODUCTION (LIVE)

Use:

```js
baseURL: "https://task-tracker-pk81.onrender.com/api"
```

---

## 🚀 HOW IT WORKS

```text
React (Frontend)
   ↓
Express API (Backend)
   ↓
MongoDB (Database)
```

---

## ⚠️ NOTES

* Backend hosted on Render (may sleep)
* First request can take time
* Use correct API URL depending on environment

---

## 🚀 FUTURE IMPROVEMENTS

* Better UI (Material UI / Tailwind)
* Notifications
* File uploads
* Role-based dashboards

---

## 👨‍💻 Author
S S Rohan
