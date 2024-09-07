import { Job, Queue, Worker } from "bullmq";
import { defaultQueueConfig, redisConnection } from "../config/queue.js";
import { sendEmail } from "../config/mail.js";

export const emailQueueName = "emailQueue";

export const emailQueue = new Queue(emailQueueName, {
  connection: redisConnection,
  defaultJobOptions: defaultQueueConfig,
});

// * Workers
export const handler = new Worker(
  emailQueueName,
  async (job: Job) => {
    const data = job.data;
    await sendEmail(data.to, data.subject, data.html);
  },
  { connection: redisConnection }
);
