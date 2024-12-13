import { schedule } from "node-cron";
import { processScheduledEmails } from "../utils/emailScheduler.js";

export default initScheduledTasks = () => {
  // Schedule task to send emails at 9:00 AM every day except Saturday
  schedule(
    "0 9 * * 1-5",
    () => {
      processScheduledEmails();
    },
    {
      scheduled: true,
      timezone: "America/New_York",
    }
  );
};
