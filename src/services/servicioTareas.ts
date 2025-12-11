import { Tarea, IdTarea, FiltroTarea } from "../models/models";
import { RepositorioTareasSqlite } from "../repositories/repositorioTareasSqlite";

export class ServicioTareas {
  constructor(private repo: RepositorioTareasSqlite) {}

  listar(filtro: FiltroTarea): Tarea[] {
    const todas = this.repo.obtenerTodas();
    switch (filtro) {
      case "pendientes":
        return todas.filter((t) => !t.completada);
      case "completadas":
        return todas.filter((t) => t.completada);
      case "todas":
      default:
        return todas;
    }
  }

  crear(titulo: string, descripcion?: string): Tarea {
    if (!titulo || titulo.trim().length === 0) {
      throw new Error("El título no puede estar vacío");
    }
    return this.repo.crear(titulo, descripcion);
  }

  obtenerPorId(id: IdTarea): Tarea | undefined {
    if (id == null) {
      throw new Error("El id no debe ser nulo");
    }
    return this.repo.obtenerPorId(id);
  }

  actualizar(tarea: Tarea): Tarea | undefined {
    return this.repo.actualizar(tarea);
  }

  borrar(id: IdTarea): boolean {
    if (id == null) {
        throw new Error("El id no debe ser nulo");
    }
    return this.repo.borrar(id);
  }
}
