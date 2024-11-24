import { Context } from "@hono/hono";
import { ZodSchema } from "https://deno.land/x/zod/mod.ts";

export const validateBody = (schema: ZodSchema) => {
  return async (c: Context, next: () => Promise<void>) => {
    try {
      const body = await c.req.json();
      schema.parse(body); // Valide le body selon le schéma
      await next();
    } catch (error: any) {
      return c.json({ error: error || error.message }, 400);
    }
  };
};
