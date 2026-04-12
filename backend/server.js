const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");



const authRoutes = require("./routes/authRoutes");
// const protect = require("./middleware/authMiddleware");
const { protect } = require("./middleware/authMiddleware");



dotenv.config();
connectDB();



const app = express();

app.use(express.json());
app.use(cors());



app.use("/api/auth", authRoutes);
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/issues", require("./routes/issueRoutes"));
app.use("/api/users", require("./routes/userRoutes"));


app.get("/", (req, res) => {
  res.send("API is running...");
});


/****-------------------------------- */

app.get("/api/protected", protect, (req, res) => {
  res.json({
    msg: "You accessed protected route",
    user: req.user
  });
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});