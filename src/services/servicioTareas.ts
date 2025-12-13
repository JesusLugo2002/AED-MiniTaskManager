import { Tarea, IdTarea, FiltroTarea } from "../models/models";
import ITareaRepository from "../repositories/interfaces/ITareaRepository";

export class ServicioTareas {

  constructor(private repo: ITareaRepository) {}

  async findAllWithFilter(filter: FiltroTarea): Promise<Tarea[]> {
    const tareas = await this.repo.findAll();
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

  async create(titulo: string, descripcion?: string): Promise<Tarea> {
    if (!titulo || titulo.trim().length === 0) {
      throw new Error("El título no puede estar vacío");
    }
    return await this.repo.create(titulo, descripcion);
  }

  async findById(id: IdTarea): Promise<Tarea | undefined> {
    if (id == null) {
      throw new Error("El id no debe ser nulo");
    }
    return await this.repo.findById(id);
  }

  async update(tarea: Tarea): Promise<Tarea | undefined> {
    return await this.repo.update(tarea);
  }

  async deleteById(id: IdTarea): Promise<boolean> {
    if (id == null) {
        throw new Error("El id no debe ser nulo");
    }
    return await this.repo.deleteById(id);
  }
}
