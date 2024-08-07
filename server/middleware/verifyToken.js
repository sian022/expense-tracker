// middleware/verifyToken.js
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { Op } = require("sequelize");
const User = require("../models/UserModel");
const { JWT_SECRET } = require("../utils/constants");

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    try {
      // Verify the token
      const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
      console.log("Decoded token:", decoded);

      // Attach user details to the request object for further use in the route
      const user = await User.findOne({
        where: {
          id: decoded.userId,
          username: {
            [Op.like]: decoded.username,
          },
        },
      });

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    // No token in the header
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = verifyToken;
