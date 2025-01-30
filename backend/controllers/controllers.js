let points = 5000;

//dice result

const diceResult = (req, res) => {
  const dice1 = Math.floor(Math.random() * 6) + 1; //random values from 1to6
  const dice2 = Math.floor(Math.random() * 6) + 1;
  const sum = dice1 + dice2;
  // console.log(sum);
  res.json({ dice1, dice2, sum });
};
module.exports = diceResult;
