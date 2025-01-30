let playerPoints = 5000;

//dice result

const diceResult = (req, res) => {
  const dice1 = Math.floor(Math.random() * 6) + 1; //random values from 1to6
  const dice2 = Math.floor(Math.random() * 6) + 1;
  const sum = dice1 + dice2;
  // console.log(sum);
  res.json({ dice1, dice2, sum });
};

const updatePoints = (req, res) => {
  const { bet, choice, sum } = req.body;
  //   console.log(bet, choice, sum);

  let winPoints = 0;
  if (sum < 7 && choice === "7down") {
    winPoints = bet * 2;
  } else if (sum > 7 && choice === "7up") {
    winPoints = bet * 2;
  } else if (sum === 7 && choice === "7") {
    winPoints = bet * 5;
  } else {
    winPoints = winPoints - bet;
  }
  playerPoints = playerPoints + winPoints;
  //   console.log(playerPoints);
  res.json({ points: playerPoints, winPoints });
};
module.exports = { diceResult, updatePoints };
