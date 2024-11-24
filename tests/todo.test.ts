// todo.service.test.ts
import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { Todo } from "../src/models/todo.model.ts";
import { MockCollection } from "./mockCollection.ts";

Deno.test({
  name: "createTodo adds a Todo to the mock collection",
  async fn() {
    const mockCollection = new MockCollection();
    const todo: Todo = { id: "1", task: "Test Todo", completed: false };
    await mockCollection.insertOne(todo);

    const savedTodo = await mockCollection.findOne({ id: "1" });
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
    await mockCollection.insertOne(todo);
    const updates = { task: "Updated Title" };
    const { modifiedCount } = await mockCollection.updateOne(
      { id: "1" },
      updates
    );
    assertEquals(modifiedCount > 0, true);
    const updatedTodo = await mockCollection.findOne({ id: "1" });
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
    await mockCollection.insertOne(todo);
    const { deletedCount } = await mockCollection.deleteOne({ id: "1" });

    assertEquals(deletedCount > 0, true);
  },
  sanitizeResources: false, // Disable resource sanitization for this test
  sanitizeOps: false, // Disable async operation sanitization for this test
});
