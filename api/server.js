const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const port = process.env.PORT || 3333;

const recipeRoutes = require("./routes/recipe");
const userRoutes = require("./routes/user");

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World to the Recipe API!");
});

app.use("/api/recipes", recipeRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Recipe api listening on port ${port}`);
});
