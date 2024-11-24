import { z } from "https://deno.land/x/zod/mod.ts";

export const todoSchema = z.object({
  id: z.string().min(1, "Invalid ID format. Must be reuired"),
  task: z.string().min(1, "Task description is required."),
  completed: z.boolean(),
});

export const todoDeleteSchema = z.object({
  id: z.string().min(1, "Invalid ID format. Must be reuired"),
});
