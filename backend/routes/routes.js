const express = require("express");
const {
  diceResult,
  updatePoints,
  startGame,
} = require("../controllers/controllers");

const router = express.Router();

//routes
router.post("/roll-dice", diceResult);
router.post("/updatePoints", updatePoints);
router.post("/startGame", startGame);

module.exports = router;
