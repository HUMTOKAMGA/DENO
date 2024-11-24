import { Hono } from "@hono/hono";
import todoRoutes from "./routes/todo.route.ts";

const app = new Hono();
app.route("/api", todoRoutes);

Deno.serve(app.fetch);
