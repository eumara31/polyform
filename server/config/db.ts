import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";
import path from "path";

dotenv.config({
});

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || ""),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 999,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool
  .query("SELECT NOW()")
  .then(() => console.log("DB is connected"))
  .catch((err) => {
    console.error("DB error:", err);
    process.exit(1);
  });

export const closePool = () => pool.end();
