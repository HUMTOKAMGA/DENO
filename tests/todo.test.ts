// todo.service.test.ts
import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { Todo } from "../src/models/todo.model.ts";
import {
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../src/services/todo.service.ts";
import { MockCollection } from "./mockCollection.ts";

Deno.test({
  name: "createTodo adds a Todo to the mock collection",
  async fn() {
    const mockCollection = new MockCollection();
    const todo: Todo = { id: "1", task: "Test Todo", completed: false };
    await createTodo(todo, mockCollection);
    const savedTodo = await getTodo("1", mockCollection);
    assertEquals(savedTodo?.task, "Test Todo");
  },
  sanitizeResources: false, // Disable resource sanitization for this test
  sanitizeOps: false, // Disable async operation sanitization for this test
});

Deno.test({
  name: "updateTodo updates a Todo in the mock collection",
  async fn() {
    const mockCollection = new MockCollection();
    const todo: Todo = { id: "1", task: "Test Todo", completed: false };
    await createTodo(todo, mockCollection);
    const updates = { task: "Updated Title" };
    const result = await updateTodo("1", updates, mockCollection);
    assertEquals(result, true);
    const updatedTodo = await getTodo("1", mockCollection);
    assertEquals(updatedTodo?.task, "Updated Title");
  },
  sanitizeResources: false, // Disable resource sanitization for this test
  sanitizeOps: false, // Disable async operation sanitization for this test
});

Deno.test({
  name: "deleteTodo removes a Todo from the mock collection",
  async fn() {
    const mockCollection = new MockCollection();
    const todo: Todo = { id: "1", task: "Test Todo", completed: false };
    await createTodo(todo, mockCollection);
    const result = await deleteTodo("1", mockCollection);
    assertEquals(result, true);
  },
  sanitizeResources: false, // Disable resource sanitization for this test
  sanitizeOps: false, // Disable async operation sanitization for this test
});
