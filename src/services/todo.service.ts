// todo.service.ts
import { connect, getDb } from "../database/database.ts";
import { Todo } from "../models/todo.model.ts";
import { logger } from "../utils/logger.ts";

await connect();
const db = getDb();
const todos = db.collection<Todo>("todos");

export const createTodo = async (
  todo: Todo,
  collection: any = null
): Promise<Todo> => {
  logger.debug(`Tentative de création du Todo avec l'ID : ${todo.id}`);
  const newTodo: Todo = todo;
  await todos.insertOne(newTodo);
  logger.info(`Todo créé avec succès : ${JSON.stringify(newTodo)}`);
  return newTodo;
};

export const getTodo = async (
  id: string,
  collection: any = null
): Promise<Todo | null> => {
  logger.debug(`Recherche du Todo avec l'ID : ${id}`);
  const todo = await todos.findOne({ id: id });
  if (todo) {
    logger.info(`Todo trouvé : ${JSON.stringify(todo)}`);
  } else {
    logger.warn(`Aucun Todo trouvé avec l'ID : ${id}`);
  }
  return todo;
};

export const getTodos = async (): Promise<Array<Todo>> => {
  logger.debug("Récupération de tous les Todos");
  const allTodos = await todos.find({}, { projection: { _id: 0 } }).toArray();
  logger.info(`Nombre de Todos récupérés : ${allTodos.length}`);
  return allTodos;
};

export const updateTodo = async (
  id: string,
  updates: Partial<Todo>,
  collection: any = null
): Promise<boolean> => {
  logger.debug(`Tentative de mise à jour du Todo avec l'ID : ${id}`);
  const { modifiedCount } = await todos.updateOne(
    { id: id },
    { $set: updates }
  );
  if (modifiedCount > 0) {
    logger.info(`Todo avec l'ID : ${id} mis à jour avec succès`);
    return true;
  } else {
    logger.warn(`Aucun Todo mis à jour avec l'ID : ${id}`);
    return false;
  }
};

export const deleteTodo = async (
  id: string,
  collection: any = null
): Promise<boolean> => {
  logger.debug(`Tentative de suppression du Todo avec l'ID : ${id}`);
  const result = await todos.deleteOne({ id: id });
  if (result.deletedCount === 1) {
    logger.info(`Todo avec l'ID : ${id} supprimé avec succès`);
    return true;
  } else {
    logger.warn(`Aucun Todo supprimé avec l'ID : ${id}`);
    return false;
  }
};
