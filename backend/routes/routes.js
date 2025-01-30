const express = require("express");
const diceResult = require("../controllers/controllers");

const router = express.Router();

//routes
router.post("/roll-dice", diceResult);

module.exports = router;
