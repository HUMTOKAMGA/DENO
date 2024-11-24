import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { Db, MongoClient } from "npm:mongodb@6.1.0";
import { Todo } from "../src/models/todo.model.ts";

let db: Db | null = null;
const client = new MongoClient("mongodb://127.0.0.1:27017");
await client.connect();
db = client.db("todoTest");
const todos = db.collection<Todo>("todos");

Deno.test({
  name: "createTodo ajoute un Todo à la base de données",
  async fn() {
    const todo: Todo = { id: "20", task: "Test Todo", completed: false };
    await todos.insertOne(todo);
    const savedTodo = await todos.findOne({ id: "20" });
    assertEquals(savedTodo?.task, "Test Todo");
    await client.close();
  },
  sanitizeResources: false, // Disable resource sanitization for this test
  sanitizeOps: false, // Disable async operation sanitization for this test
});

Deno.test({
  name: "getTodo récupère un Todo existant",
  async fn() {
    await client.connect();
    const todo = await todos.findOne({ id: "20" });
    assertEquals(todo?.id, "20");
    await client.close();
  },
  sanitizeResources: false, // Disable resource sanitization for this test
  sanitizeOps: false, // Disable async operation sanitization for this test
});

Deno.test({
  name: "updateTodo met à jour les champs spécifiés d'un Todo",
  async fn() {
    await client.connect();
    const updates = { task: "Updated Title" };
    const { modifiedCount } = await todos.updateOne(
      { id: "20" },
      { $set: updates }
    );
    assertEquals(modifiedCount > 0, true);
    const updatedTodo = await todos.findOne({ id: "20" });
    assertEquals(updatedTodo?.task, "Updated Title");
    await client.close();
  },
  sanitizeResources: false, // Disable resource sanitization for this test
  sanitizeOps: false, // Disable async operation sanitization for this test
});

Deno.test({
  name: "deleteTodo supprime un Todo de la base de données",
  async fn() {
    await client.connect();
    const result = await todos.deleteOne({ id: "20" });
    assertEquals(result.deletedCount === 1, true);
    await client.close();
  },
  sanitizeResources: false, // Disable resource sanitization for this test
  sanitizeOps: false, // Disable async operation sanitization for this test
});
