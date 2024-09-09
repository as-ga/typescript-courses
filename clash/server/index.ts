import express, { Application, Request, Response } from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import { sendEmail } from "./config/mail.js";
import ejs, { name } from "ejs";
import { emailQueue, emailQueueName } from "./jobs/EmailQueue.js";

const app: Application = express();
const port: number = Number(process.env.PORT || 5000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./"));

app.get("/", async (req: Request, res: Response) => {
  // const html = await ejs.renderFile(__dirname + `/emails/welcome.ejs`, {
  //   name: "Ashutosh Gaurav",
  // });
  // await sendEmail("geyeyev843@obisims.com", "Testing SMTP", html);

  // await emailQueue.add(emailQueueName, { name: "Ashutosh Gaurav", age: 21 });

  // return res.render("emails/welcome", { name: "Ashutosh Gaurav" });
  return res.json({ message: "Email sent Successfully" });
});

// app.get("/", async (req: Request, res: Response) => {
//   const hoursDiff = checkDateHourDifference("2024-07-15T07:36:28.019Z");

//   return res.json({ message: hoursDiff });
// });

// *Routes
import routes from "./routing/index.js";
// import { checkDateHourDifference } from "./helper.js";
// import { setupSocket } from "./socket.js";
app.use("/", routes);

// Queue
// import '../jobs/index.js'

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
