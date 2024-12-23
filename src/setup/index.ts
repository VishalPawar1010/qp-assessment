import { expressLoader } from "./express";
import { sequelize } from "./database";
import { logger } from "../utils/logger";

export default async ({ expressApp }) => {
  /**
   * Load database
   */
  sequelize
    .authenticate()
    .then(() => {
      logger.info(`Database loaded successfully`);
    })
    .catch((error) => console.log(error));

  expressLoader(expressApp);
};
