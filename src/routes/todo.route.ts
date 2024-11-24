import { Hono } from "@hono/hono";
import {
  addTodo,
  deleteTodos,
  fetchAllTodo,
  fetchTodo,
  modifyTodo,
} from "../controllers/todo.controller.ts";
import { validateBody } from "../middlewares/validation.middleware.ts";
import { todoSchema } from "../shemas/todo.schema.ts";

const todoRoutes = new Hono();

todoRoutes.post("/todo", validateBody(todoSchema), addTodo);
todoRoutes.get("/todos", fetchAllTodo);
todoRoutes.get("/todo/:id", fetchTodo);
todoRoutes.put("/todo/:id", validateBody(todoSchema), modifyTodo);
todoRoutes.delete("/todo/:id", deleteTodos);

export default todoRoutes;
