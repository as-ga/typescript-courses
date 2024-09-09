import { Job, Queue, Worker } from "bullmq";
import { defaultQueueConfig, redisConnection } from "../config/queue.js";
// import { sendEmail } from "../config/mail.js";

export const emailQueueName = "emailQueue";

export const emailQueue = new Queue(emailQueueName, {
  connection: redisConnection,
  defaultJobOptions: defaultQueueConfig,
});

// * Workers
export const queueWorker = new Worker(
  emailQueueName,
  async (job: Job) => {
    const data = job.data;
    console.log("Job Data", data);
    // await sendEmail(data.to, data.subject, data.html);
  },
  { connection: redisConnection }
);
