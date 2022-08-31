import express from "express";
import "dotenv/config";
import cors from "cors"
import authRouter from "./routes/auth.route.js";
import eventRouter from "./routes/events.route.js"
import dbConnection from "./database/config.js";

const app = express();
dbConnection()

app.use(cors())

app.use(express.static("public"));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/events",eventRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
