const Role = require("../models/RoleModel");
const User = require("../models/UserModel");
const { Op } = require("sequelize");

const RoleController = {
  createRole: async (req, res, next) => {
    try {
      const { roleName, permissions } = req.body;

      // Check if the role already exists
      const existingRole = await Role.findOne({
        where: {
          roleName: {
            [Op.like]: roleName,
          },
        },
      });

      // If the role already exists, throw an error
      if (existingRole) {
        const error = new Error("Role already exists");
        error.statusCode = 400;
        throw error;
      }

      // Create the role
      const role = await Role.create({
        roleName,
        permissions,
      });

      res.json({ message: "Role created successfully", role });
    } catch (error) {
      next(error);
    }
  },

  getAllRoles: async (req, res, next) => {
    try {
      const { page = 1, pageSize = 10, search = "" } = req.query;
      const offset = (page - 1) * pageSize;

      // Get all roles
      const roles = await Role.findAndCountAll({
        where: {
          roleName: {
            [Op.like]: `%${search}%`,
          },
        },
        offset,
        limit: pageSize,
      });

      // Return the roles with pagination details
      res.json({
        roles: roles.rows,
        totalRoles: roles.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(roles.count / pageSize),
      });
    } catch (error) {
      next(error);
    }
  },

  getRoleById: async (req, res, next) => {
    try {
      const { id } = req.params;

      // Find the role by ID
      const role = await Role.findByPk(id);

      // If the role does not exist, throwe an error
      if (!role) {
        const error = new Error("Role not found");
        error.statusCode = 404;
        throw error;
      }

      res.json({ role });
    } catch (error) {
      next(error);
    }
  },

  updateRole: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { roleName, permissions } = req.body;

      // Find the role by ID
      const role = await Role.findByPk(id);

      // If the role does not exist, throw an error
      if (!role) {
        const error = new Error("Role not found");
        error.statusCode = 404;
        throw error;
      }

      // Check if the role already exists
      const existingRole = await Role.findOne({
        where: {
          roleName: {
            [Op.like]: roleName,
          },
        },
      });

      // If the role already exists, throw an error
      if (existingRole && existingRole.id !== role.id) {
        const error = new Error("Role already exists");
        error.statusCode = 400;
        throw error;
      }

      // Update the role
      role.roleName = roleName;
      role.permissions = permissions;

      await role.save();

      res.json({ message: "Role updated successfully", role });
    } catch (error) {
      next(error);
    }
  },

  updateRoleStatus: async (req, res, next) => {
    try {
      const { id } = req.params;

      const role = await Role.findByPk(id);

      if (!role) {
        const error = new Error("Role not found");
        error.statusCode = 404;
        throw error;
      }

      // Check if the role is in use
      const isRoleInUse = await User.findOne({
        where: {
          roleId: role.id,
        },
      });

      // If the role is in use, return an error
      if (isRoleInUse) {
        const error = new Error("Role is in use and cannot be archived");
        error.statusCode = 400;
        throw error;
      }

      role.isActive = !role.isActive;
      await role.save();

      res.json({
        message: `Role ${role.isActive ? "restored" : "archived"} successfully`,
        role,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = RoleController;
