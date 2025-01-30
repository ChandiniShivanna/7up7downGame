const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes.js");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/7up7downGame", routes);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
