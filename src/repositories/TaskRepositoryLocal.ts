import Database from "better-sqlite3";
import { getDb } from "../database/db";
import { Task, TaskId } from "../models/models";
import ITaskRepository from "./interfaces/ITaskRepository";

export class TaskRepositoryLocal implements ITaskRepository {
  
  private db: Database.Database;

  constructor(db?: Database.Database) {
    this.db = db ?? getDb();
  }

  findAll(): Task[] {
    const statement = this.db.prepare("SELECT * FROM tareas");
    return statement.all() as Task[];
  }

  findById(id: TaskId): Task | undefined {
    const statement = this.db.prepare("SELECT * FROM tareas WHERE id = ?");
    return statement.get(id) as Task;
  }

  create(title: string, description?: string): Task {
    const statement = this.db.prepare(
      "INSERT INTO tareas (titulo, descripcion, completada) VALUES (?, ?, 0)"
    );
    const execution = statement.run(title, description);
    const id = Number(execution.lastInsertRowid);
    return this.findById(id) as Task;
  }

  update(task: Task): Task | undefined {
    const statement = this.db.prepare(
      "UPDATE tareas SET titulo = ?, descripcion = ?, completada = ? WHERE id = ?"
    );
    const execution = statement.run(
      task.title,
      task.description,
      task.completed ? 1 : 0,
      task.id
    );
    const hasChanges = execution.changes > 0;
    return hasChanges ? this.findById(task.id) : undefined;
  }

  deleteById(id: TaskId): boolean {
    const statement = this.db.prepare("DELETE FROM tareas WHERE id = ?");
    const execution = statement.run(id);
    return execution.changes > 0;
  }
}
