import express from "express";
import dotenv from "dotenv";
import conntectDB from "./libs/db.js";
import { AuthRoutes } from "./routes/AuthRoutes.js";
import cors from 'cors';

dotenv.config();
conntectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth", AuthRoutes);



app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
