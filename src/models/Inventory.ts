import { DataTypes, Op } from "sequelize";

import { sequelize } from "../setup/database";
import { OrderItemsModel } from "./OrderItems";

export const InventoryModel = sequelize.define(
  "Inventory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    modelName: "inventory",
    tableName: "inventory",
    indexes: [
      {
        fields: ["name"],
        unique: true,
      },
      {
        name: "inventory_id_quantity",
        fields: ["id", "quantity"],
        where: {
          quantity: {
            [Op.gt]: 0,
          },
        },
      },
    ],
  }
);

InventoryModel.hasMany(OrderItemsModel, {
  foreignKey: {
    name: "itemId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

OrderItemsModel.belongsTo(InventoryModel, {
  foreignKey: "itemId",
});

// InventoryModel.sync();
