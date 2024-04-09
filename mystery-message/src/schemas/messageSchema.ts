import { z } from "zod";

export const MessageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Message must be at least 10 character." })
    .max(500, { message: "Message must be at most 500 characters." }),
});
