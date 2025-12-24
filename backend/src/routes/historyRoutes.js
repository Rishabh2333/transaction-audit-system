const express = require("express");
const { getTransactionHistory } = require("../controllers/historyController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/history", authMiddleware, getTransactionHistory);

module.exports = router;
