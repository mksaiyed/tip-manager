const express = require("express");
const router = express.Router();
const { calculateTip, getTips } = require("../controllers/tipController");
const auth = require("../middlewares/auth");

router.post("/tip/calculate", auth, calculateTip);
router.get("/tip", auth, getTips);

module.exports = router;
