import { Context } from "@hono/hono";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../services/todo.service.ts";

export const addTodo = async (c: Context) => {
  const newTodo = await c.req.json();
  const todo = await createTodo(newTodo);
  return c.json(todo);
};

export const fetchAllTodo = async (c: Context) => {
  const todos = await getTodos();
  if (!todos) return c.json({ message: "Todo not found" }, 404);
  return c.json(todos);
};

export const fetchTodo = async (c: Context) => {
  const id = c.req.param("id");
  const todo = await getTodo(id);
  if (!todo) return c.json({ message: "Todo not found" }, 404);
  return c.json(todo);
};

export const modifyTodo = async (c: Context) => {
  const id = c.req.param("id");
  const updates = await c.req.json();
  const success = await updateTodo(id, updates);
  if (!success)
    return c.json({ message: "Todo not found or not updated" }, 404);
  return c.json({ message: "Todo updated successfully" });
};

export const deleteTodos = async (c: Context) => {
  const id = c.req.param("id");
  const success = await deleteTodo(id);
  if (!success) return c.json({ message: "Todo not found or not delete" }, 404);
  return c.json({ message: "Todo delete successfully" }, 200);
};
