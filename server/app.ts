import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index";
import cookieParser from "cookie-parser";
import { Request } from "express";
import cors from "cors";
import session from "express-session";
import { fileURLToPath } from 'url'
import path from "path";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

app.use("/", routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

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
