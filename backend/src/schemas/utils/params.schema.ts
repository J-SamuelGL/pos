import { z } from "zod";

export const SIDParams = z.strictObject({
  ID: z.coerce.number().int().positive().min(1),
});
