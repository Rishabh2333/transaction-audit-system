const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const historyRoutes = require("./routes/historyRoutes");

app.use("/api/auth", authRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/transactions", historyRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
