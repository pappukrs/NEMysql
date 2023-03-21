const express = require("express");
const { sequelize } = require("./database/db");
const cors = require("cors");

// console.log(sequelize, "sequelize__________");

const { router: PersonRoutes } = require("./routes/PersonRoutes");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/form", PersonRoutes);

const port = process.env.PORT || 8080;
// console.log("process.env____", process.env.PORT);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("connected to server");
    app.listen(8080, () => {
      console.log(`server is running on ${port}`);
    });
  })
  .catch((err) => {
    console.log(`server error`);
    console.log(err.message);
  });
