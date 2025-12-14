import Database from "better-sqlite3";

const DB_FILE = "tareas.db";

let db: Database.Database | null = null;

/**
 * Returns a Database instance if exists, otherwise, create one and return it.
 * @returns Database instance.
 */
export function getDb(): Database.Database {
  if (db) return db;
  db = new Database(DB_FILE);
  db.exec(`
        CREATE TABLE IF NOT EXISTS tareas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descripcion TEXT,
        completada INTEGER NOT NULL
        )
    `);
  return db;
}
