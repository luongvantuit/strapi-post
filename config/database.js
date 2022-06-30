const path = require("path");

module.exports = ({ env }) => ({
  connection: {
    client: env("DATABASE_CLIENT", "postgres"),
    connection: {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "dev"),
      user: env("DATABASE_USERNAME", "admin"),
      password: env("DATABASE_PASSWORD", "123456"),
      schema: env("DATABASE_SCHEMA", "public"),
      ssl: env.bool("DATABASE_SSL_SELF", false)
        ? {
            rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false),
          }
        : false,
    },
    useNullAsDefault: true,
  },
});
