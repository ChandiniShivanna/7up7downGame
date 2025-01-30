const express = require("express");
const { diceResult, updatePoints } = require("../controllers/controllers");

const router = express.Router();

//routes
router.post("/roll-dice", diceResult);
router.post("/updatePoints", updatePoints);

module.exports = router;
