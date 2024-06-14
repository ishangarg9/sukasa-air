import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import authRoutes from "./routes/authRoutes";
import reservationRoutes from "./routes/reservationRoutes";
dotenv.config();

export const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Sukasa Air - Running OK");
});
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

async function startServer() {
  app.use("/api/v1", authRoutes);
  app.use("/api/v1", reservationRoutes);

  const server = app.listen(port, async () => {
    try {
      // connect mongo server
      await connectDB();
      console.log(`[server]: Server is running at http://localhost:${port}`);
    } catch (error) {
      console.error("Error connecting to MongoDB: ", error);
      server.close(() => {
        console.log("Server closed due to MongoDB connection error.");
        process.exit(1);
      });
    }
  });

  server.on("error", (error) => {
    console.log("Server start Error: ", error);
    server.close();
  });
}

startServer();
