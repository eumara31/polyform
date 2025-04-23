import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index";
import { pool } from "./config/db";
import cookieParser from "cookie-parser";
import path from "path";
import { Request } from "express";
import cors from "cors";
import session from "express-session";
import { blob } from "stream/consumers";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors<Request>({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use("/api", routes);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ err: err.stack });
  }
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running, port: ${PORT}`);
});
