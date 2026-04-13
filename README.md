# 🚀 Task Tracker (MERN Stack Project)

A full-stack **Project Collaboration & Issue Tracking System** built using the MERN stack.
It helps teams manage projects, assign tasks, track issues, and monitor progress from a centralized dashboard.

---

## 🌐 Live Demo

👉 **Frontend (Vercel):** https://task-tracker-brown-ten.vercel.app
👉 **Backend API (Render):** https://task-tracker-pk81.onrender.com

⚠️ Note: Backend may take 20–30 seconds to respond initially due to free hosting (Render sleep mode).

---

## 🔥 Core Features

### 🔐 Authentication & Authorization

* User registration and login
* JWT-based authentication
* Role-based access:

  * **Admin (Project Manager)**
  * **Team Member**

---

### 📁 Project Management

* Create, update, delete projects (Admin only)
* Assign members to projects
* Project fields:

  * Name, description
  * Start date, end date
  * Status (pending / in-progress / completed)

---

### 🐞 Issue / Task Tracking

* Create issues under projects
* Assign issues to users
* Set priority (low / medium / high)
* Update issue status
* Role-based control:

  * Admin → full control
  * Member → update only assigned issues

---

### 📊 Dashboard

* Total projects
* Total issues
* Pending issues
* Completed issues
* Role-based visibility

---

### 🔎 Filters

* Filter issues by:

  * Status
  * Priority
  * Project

---

## 🛠 Tech Stack

* **Frontend:** React.js, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Authentication:** JWT

---

## 📁 Project Structure

```
TaskTracker/
├── backend/        # Express API
├── frontend/       # React App
├── README.md
```

---

## ⚙️ Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/ssrohan24/Task-Tracker.git
cd Task-Tracker
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔧 Environment Configuration

### 🖥 Local Development

Update `frontend/src/api/axios.js`:

```js
baseURL: "http://localhost:5000/api"
```

---

### 🌐 Production (Live)

```js
baseURL: "https://task-tracker-pk81.onrender.com/api"
```

---

## 🔄 Application Flow

```
React (Frontend)
      ↓
Express API (Backend)
      ↓
MongoDB (Database)
```

---

## ⚠️ Notes

* Backend is hosted on Render (free tier)
* First request may take time due to server cold start
* Ensure correct API URL is used based on environment

---

## 🎯 Key Highlights

* Full MERN stack implementation
* RESTful API design
* Role-based access control (RBAC)
* MongoDB relationships using references & populate
* Clean project structure (MVC pattern)

---

## 👨‍💻 Author

**S S Rohan**
