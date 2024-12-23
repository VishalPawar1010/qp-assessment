import convict from "convict";

export const config = convict({
  port: {
    doc: "PORT",
    env: "PORT",
    default: 3000,
  },
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  jwt_key: {
    doc: "JWT Private Key",
    env: "jwt_key",
    default: "mysecrettoken",
  },
  jwt_expire: {
    doc: "JWT Expiration",
    env: "jwt_expire",
    default: "24h",
  },
  db: {
    database: {
      doc: "Database Name",
      default: "postgres",
      env: "DATABASE",
    },
    username: {
      doc: "Username",
      default: "postgres",
      env: "DB_USERNAME",
    },
    password: {
      doc: "Password",
      default: "password",
      env: "DB_PASSWORD",
    },
    host: {
      doc: "DB Host",
      default: "localhost",
      env: "DB_HOST",
    },
    port: {
      doc: "DB Port",
      default: 5432,
      env: "DB_PORT",
    },
  },
});
