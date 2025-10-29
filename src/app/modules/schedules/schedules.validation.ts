import { z } from "zod";

// Regex to validate HH:mm (24-hour format)
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const createScheduleSchema = z.object({
  startDate: z
    .string()
    .min(1, "startDate is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "startDate must be in YYYY-MM-DD format"),

  endDate: z
    .string()
    .min(1, "endDate is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "endDate must be in YYYY-MM-DD format"),

  startTime: z
    .string()
    .min(1, "startTime is required")
    .regex(timeRegex, "startTime must be in HH:mm format"),

  endTime: z
    .string()
    .min(1, "endTime is required")
    .regex(timeRegex, "endTime must be in HH:mm format"),
});
