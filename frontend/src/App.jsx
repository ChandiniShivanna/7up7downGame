import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Box, Typography, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";
import "./App.css";

const diceImages = {
  1: "/Images/dice1.png",
  2: "/Images/dice2.png",
  3: "/Images/dice3.png",
  4: "/Images/dice4.png",
  5: "/Images/dice5.png",
  6: "/Images/dice6.png",
};
const App = () => {
  const [points, setPoints] = useState(5000);
  const [choice, setChoice] = useState("7up");
  const [bet, setBet] = useState(100);
  const [dice, setDice] = useState({ dice1: 1, dice2: 1, sum: 2 });
  const [result, setResult] = useState("");
  const [loading, setloading] = useState(false);
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    axios.post("http://localhost:3000/api/7up7downGame/startGame");
  }, []);

  const rollDice = () => {
    setloading(true);
    setRolling(true);
    axios
      .post("http://localhost:3000/api/7up7downGame/roll-dice")
      .then((res) => {
        setTimeout(() => {
          setDice(res.data);
        }, 1000);
        return axios.post(
          "http://localhost:3000/api/7up7downGame/updatePoints",
          {
            bet,
            choice,
            sum: res.data.sum,
          }
        );
      })
      .then((res) => {
        setPoints(res.data.points);
        setResult(
          res.data.winPoints >= 0
            ? `You Won ${res.data.winPoints}`
            : `You Lost ${-res.data.winPoints}`
        );
      })
      .finally(() => {
        setloading(false);
        setTimeout(() => setRolling(false), 1000);
      });
  };

  return (
    <Container maxWidth="xs" className="game-container">
      <Box
        className="title-section"
        sx={{
          border: "2px solid red",
          borderRadius: "8px",
          background: "black",
          padding: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" className="title">
          7Up 7Down Game
        </Typography>
      </Box>
      <Box
        className="points-button"
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        marginTop={2}
      >
        <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
          Points:
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: "Gold", fontWeight: "bold", marginLeft: 1 }}
        >
          {points}
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        gap={2}
        className="game-area"
        margin={2}
      >
        {[
          { label: "7 Down", value: "7down" },
          { label: "Lucky 7", value: "7" },
          { label: "7 Up", value: "7up" },
        ].map((option) => (
          <Button
            key={option.value}
            variant={choice === option.value ? "contained" : "outlined"}
            onClick={() => setChoice(option.value)}
            className={choice === option.value ? "bet-selected" : "bet-button"}
            style={{
              height: "100px",
              width: "80px",
              backgroundColor: choice === option.value ? "orange" : "",
            }}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      <Box
        className="dice-images"
        margin={2}
        display="flex"
        justifyContent="center"
        gap={2}
      >
        {[dice.dice1, dice.dice2].map((di, index) => (
          <motion.img
            key={index}
            src={diceImages[di]}
            alt={`Dice ${di}`}
            width="70"
            height="70"
            className="dice-roll-animation"
            animate={rolling ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
            style={{ margin: "0 10px" }}
          />
        ))}
      </Box>

      <Typography
        variant="h5"
        color="white"
        fontWeight="bold"
        className="win-text"
        align="center"
      >
        {result ? result : "Result is here"}
      </Typography>
      <Box className="title-section">
        <Typography variant="h5" color="black" fontWeight="bold" margin={2}>
          Bet Amount :
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        gap={2}
        className="bet-amount"
      >
        {[100, 200, 500].map((amount) => (
          <Box key={amount}>
            <Button
              variant={bet === amount ? "contained" : "outlined"}
              className={bet === amount ? "bet-selected" : "bet-button"}
              onClick={() => setBet(amount)}
              style={{
                height: "40px",
                width: "80px",
                backgroundColor: bet === amount ? "orange" : "",
              }}
            >
              {amount}
            </Button>
          </Box>
        ))}
      </Box>

      <Button
        sx={{
          border: "2px solid red",
          borderRadius: "10%",
          background: "black",
          padding: "10px",
          color: "red",
          margin: "20px 0 0 40%",
        }}
        variant="h4"
        className="roll-dice"
        onClick={rollDice}
        disabled={loading}
      >
        Roll Dice
      </Button>
    </Container>
  );
};
export default App;
