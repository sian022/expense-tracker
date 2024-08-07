const User = require("../models/UserModel");
const Role = require("../models/RoleModel");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const UserController = {
  createUser: async (req, res, next) => {
    try {
      const { username, password, roleId } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({
        where: {
          username: {
            [Op.like]: username,
          },
        },
      });

      // If the user already exists, throw an error
      if (existingUser) {
        const error = new Error("User already exists");
        error.statusCode = 400;
        throw error;
      }

      // Check if the role exists
      const role = await Role.findByPk(roleId);

      // If the role does not exist, throw an error
      if (!role) {
        const error = new Error("Role not found");
        error.statusCode = 404;
        throw error;
      }

      // Create the user
      const user = await User.create({
        username,
        password,
        roleId,
      });

      res.json({ message: "User created successfully", user });
    } catch (error) {
      next(error);
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const { id } = req.params;

      // Find the user by ID
      const user = await User.findByPk(id);

      // If the user does not exist, throw an error
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      // Reset the user password
      user.password = `${user.username}123`;
      await user.save();

      res.json({ message: "Password reset successfully" });
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const { page = 1, pageSize = 10, search = "" } = req.query;
      const offset = (page - 1) * pageSize;

      // Get all users
      const users = await User.findAndCountAll({
        attributes: ["id", "username", "isActive", "createdAt", "updatedAt"],
        include: [{ model: Role, as: "role" }],
        where: {
          username: {
            [Op.like]: `%${search}%`,
          },
        },
        offset,
        limit: pageSize,
      });

      // Return the users with pagination details
      res.json({
        users: users.rows,
        totalUsers: users.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(users.count / pageSize),
      });
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;

      // Find the user by ID
      const user = await User.findByPk(id, {
        attributes: ["id", "username", "isActive", "createdAt", "updatedAt"],
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["id", "roleName", "permissions"],
          },
        ],
      });

      // If the user does not exist, throw an error
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      res.json({ user });
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username, roleId } = req.body;

      // Find the user by ID
      const user = await User.findByPk(id);

      // If the user does not exist, throw an error
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      // Check if the user already exists
      const existingUser = await User.findOne({
        where: {
          username: {
            [Op.like]: username,
          },
        },
      });

      // If the user already exists, throw an error
      if (existingUser && existingUser.id !== user.id) {
        const error = new Error("User already exists");
        error.statusCode = 400;
        throw error;
      }

      // Update the user
      user.username = username;
      user.roleId = roleId;

      await user.save();

      res.json({ message: "User updated successfully", user });
    } catch (error) {
      next(error);
    }
  },

  updateUserStatus: async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      // Update the user status
      user.isActive = !user.isActive;
      await user.save();

      res.json({
        message: `User ${user.isActive ? "restored" : "archived"} successfully`,
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      // Check if the current user is changing their own password
      if (req.user.id !== user.id) {
        const error = new Error("Cannot change another user's password");
        error.statusCode = 401;
        throw error;
      }

      // Check if the old password is correct
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        const error = new Error("Old password is incorrect");
        error.statusCode = 400;
        throw error;
      }

      // Change the user password
      user.password = newPassword;
      await user.save();

      res.json({ message: "Password changed successfully" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = UserController;
