import express, { Application, Request, Response } from "express";
import "dotenv/config";

const app: Application = express();
const port: number = Number(process.env.PORT || 5000);

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello It's Working");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
