import { Sequelize } from "sequelize";

import { logger } from "../utils/logger";
import { config } from "../config";
import { OrderModel } from "../models/Order";
import { OrderItemsModel } from "../models/OrderItems";
import { InventoryModel } from "../models/Inventory";

export const sequelize = new Sequelize(
  config.get("db.database"),
  config.get("db.username"),
  config.get("db.password"),
  {
    host: config.get("db.host"),
    port: config.get("db.port"),
    dialect: "postgres" || config.get("db.database"),
    logging: (...msg) => logger.info(`${msg[0]}`),
  }
);

// Centralized sync function
export const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Use force: true only in development to drop tables
    logger.info("Database synchronized successfully");
  } catch (error) {
    logger.error("Error synchronizing database: ", error);
  }
};
