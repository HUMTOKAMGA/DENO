import { Db, MongoClient } from "npm:mongodb@6.1.0";

let db: Db | null = null;

export async function connect(): Promise<void> {
  if (db) {
    // If the database connection is already established, return early.
    return;
  }
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  db = client.db("todoApp");
}

export function getDb(): Db {
  if (!db) {
    throw new Error(
      "Database connection is not established. Call connect() first."
    );
  }
  return db;
}
