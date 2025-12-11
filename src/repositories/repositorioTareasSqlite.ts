import { getDb } from "../database/db";
import { Tarea, IdTarea } from "../models/models";

export class RepositorioTareasSqlite {
  private db = getDb();

  obtenerTodas(): Tarea[] {
    const statement = this.db.prepare("SELECT * FROM tareas");
    return statement.all() as Tarea[];
  }

  obtenerPorId(id: IdTarea): Tarea | undefined {
    const statement = this.db.prepare("SELECT * FROM tareas WHERE id = ?");
    return statement.get(id) as Tarea;
  }

  crear(titulo: string, descripcion?: string): Tarea {
    const statement = this.db.prepare(
      "INSERT INTO tareas (titulo, descripcion, completada) VALUES (?, ?, 0)"
    );
    const execution = statement.run(titulo, descripcion);
    const id = Number(execution.lastInsertRowid);
    return this.obtenerPorId(id) as Tarea;
  }

  actualizar(tarea: Tarea): Tarea | undefined {
    const statement = this.db.prepare(
      "UPDATE tareas SET titulo = ?, descripcion = ?, completada = ? WHERE id = ?"
    );
    const execution = statement.run(
      tarea.titulo,
      tarea.descripcion,
      tarea.completada ? 1 : 0,
      tarea.id
    );
    const hasChanges = execution.changes > 0;
    if (!hasChanges) {
      return undefined;
    }
    return this.obtenerPorId(tarea.id);
  }

  borrar(id: IdTarea): boolean {
    const statement = this.db.prepare("DELETE FROM tareas WHERE id = ?");
    const execution = statement.run(id);
    return execution.changes > 0;
  }
}
