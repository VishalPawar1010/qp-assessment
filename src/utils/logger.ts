// @ts-nocheck
import { createLogger, format, transports } from "winston";
import { config } from "../config";

const options = {
  level: "info",
  handleExceptions: true,
  json: true,
  colorize: true,
};

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(({ timestamp, level, message, meta }) => {
      return `${timestamp} ${level} ${message} ${
        meta ? JSON.stringify(meta) : ""
      }`;
    }),
    format.colorize()
  ),
  defaultMeta: { service: "Grocery Ordering" },
});

if (["development"].includes(config.get("env"))) {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
} else {
  logger.add(
    new transports.Console({
      transports: [new transports.Console(options)],
    })
  );
}

export {
    logger
}