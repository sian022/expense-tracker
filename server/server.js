const express = require("express");
const app = express();

const PORT = process.env.PORT || 5214;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
