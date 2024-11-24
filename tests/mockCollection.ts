// mockCollection.ts
import { Todo } from "../src/models/todo.model.ts";

export class MockCollection {
  private data: Map<string, Todo> = new Map();

  async insertOne(doc: Todo) {
    this.data.set(doc.id, doc);
    return { insertedId: doc.id };
  }

  async findOne(filter: Partial<Todo>) {
    for (const todo of this.data.values()) {
      let match = true;
      for (const key in filter) {
        if (todo[key as keyof Todo] !== filter[key as keyof Todo]) {
          match = false;
          break;
        }
      }
      if (match) return todo;
    }
    return null;
  }

  async updateOne(filter: Partial<Todo>, update: Partial<Todo>) {
    const todo = await this.findOne(filter);
    if (todo) {
      const updatedTodo = { ...todo, ...update };
      this.data.set(todo.id, updatedTodo);
      return { modifiedCount: 1 };
    }
    return { modifiedCount: 0 };
  }

  async deleteOne(filter: Partial<Todo>) {
    const todo = await this.findOne(filter);
    if (todo) {
      this.data.delete(todo.id);
      return { deletedCount: 1 };
    }
    return { deletedCount: 0 };
  }
}
