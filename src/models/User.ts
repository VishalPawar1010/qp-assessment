import { DataTypes } from "sequelize";

import { sequelize } from "../setup/database";
import { OrderModel } from "./Order";

export const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["USER", "ADMIN"],
      defaultValue: "USER",
      allowNull: false,
    },
  },
  {
    timestamps: true,
    modelName: "users",
    tableName: "users",
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
      {
        name: "email_password",
        fields: ["email", "password"],
      },
    ],
  }
);

// UserModel.sync();

UserModel.hasMany(OrderModel, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

OrderModel.belongsTo(UserModel, {
  foreignKey: "userId",
});
