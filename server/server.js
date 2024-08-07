const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const sequelize = require("./config/db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const PORT = process.env.PORT || 5214;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server: ", error);
  }
};

startServer();
