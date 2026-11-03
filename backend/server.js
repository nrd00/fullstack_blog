import express from "express";
import dotenv from "dotenv";
import conntectDB from "./libs/db.js";
import { AuthRoutes } from "./routes/AuthRoutes.js";

dotenv.config();
conntectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from express!");
});

app.use("/auth", AuthRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
