import { Tarea, IdTarea, FiltroTarea } from "../models/models";
import ITareaRepository from "../repositories/interfaces/ITareaRepository";
import { RepositorioTareasSqlite } from "../repositories/repositorioTareasSqlite";

export class ServicioTareas {

  constructor(private repo: ITareaRepository) {}

  findAllWithFilter(filter: FiltroTarea): Tarea[] {
    const tareas = this.repo.findAll();
    switch (filter) {
      case "pendientes":
        return tareas.filter((t) => !t.completada);
      case "completadas":
        return tareas.filter((t) => t.completada);
      case "todas":
      default:
        return tareas;
    }
  }

  create(titulo: string, descripcion?: string): Tarea {
    if (!titulo || titulo.trim().length === 0) {
      throw new Error("El título no puede estar vacío");
    }
    return this.repo.create(titulo, descripcion);
  }

  findById(id: IdTarea): Tarea | undefined {
    if (id == null) {
      throw new Error("El id no debe ser nulo");
    }
    return this.repo.findById(id);
  }

  update(tarea: Tarea): Tarea | undefined {
    return this.repo.update(tarea);
  }

  deleteById(id: IdTarea): boolean {
    if (id == null) {
        throw new Error("El id no debe ser nulo");
    }
    return this.repo.deleteById(id);
  }
}
