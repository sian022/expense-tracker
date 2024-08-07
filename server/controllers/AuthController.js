const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const User = require("../models/UserModel");
const Role = require("../models/RoleModel");
const { JWT_SECRET } = require("../utils/constants");

const AuthController = {
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findOne({
        where: {
          username: {
            [Op.like]: username,
          },
        },
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["id", "roleName", "permissions"],
          },
        ],
      });

      if (!user) {
        const error = new Error("Invalid username or password");
        error.statusCode = 401;
        throw error;
      }

      // Check if the user's status is active
      if (!user.isActive) {
        const error = new Error("User is inactive");
        error.statusCode = 401;
        throw error;
      }

      // Compare the entered password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        const error = new Error("Invalid username or password");
        error.statusCode = 401;
        throw error;
      }

      // Create a JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          role: user.role_id,
        },
        JWT_SECRET
      );

      res.json({ message: "Log in successful", user, token });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = AuthController;
