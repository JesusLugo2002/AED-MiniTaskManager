import { Tarea, IdTarea } from "../models/models";
import ITareaRepository from "./interfaces/ITareaRepository";

export type NuevaTarea = Omit<Tarea, "id">;

export class repositorioTareasRemoto implements ITareaRepository {

  findById(id: IdTarea): Tarea | undefined {
    throw new Error("Method not implemented.");
  }
  create(title: string, description?: string): Tarea {
    throw new Error("Method not implemented.");
  }
  update(task: Tarea): Tarea | undefined {
    throw new Error("Method not implemented.");
  }
  deleteById(id: number): boolean {
    throw new Error("Method not implemented.");
  }

  private API_URL = "http://localhost:3000/tareas";

  findAll(): Tarea[] {
    let result: Tarea[] = [];

    fetch(this.API_URL).then((response) => {
      response.json().then((data) => result = data);
    }).catch((err) => {
      console.error("Error fetching data from API", err);
    });

    return result as Tarea[];
  }

  async obtenerTarea(id: IdTarea): Promise<Tarea> {
    const respuesta = await fetch(`${this.API_URL}/${id}`);
    if (!respuesta.ok) {
      throw new Error(
        `Error al cargar tarea ${id}: ${respuesta.status} ${respuesta.statusText}`
      );
    }
    const datos: unknown = await respuesta.json();
    return datos as Tarea;
  }

  async crearTareaRemota(nueva: NuevaTarea): Promise<Tarea> {
    const respuesta = await fetch(this.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nueva),
    });

    if (!respuesta.ok) {
      throw new Error(
        `Error al crear tarea: ${respuesta.status} ${respuesta.statusText}`
      );
    }

    const datos: unknown = await respuesta.json();
    return datos as Tarea;
  }

  async actualizarTareaRemota(tarea: Tarea): Promise<Tarea> {
    const respuesta = await fetch(`${this.API_URL}/${tarea.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarea),
    });

    if (!respuesta.ok) {
      throw new Error(
        `Error al actualizar tarea ${tarea.id}: ${respuesta.status} ${respuesta.statusText}`
      );
    }

    const datos: unknown = await respuesta.json();
    return datos as Tarea;
  }

  async borrarTareaRemota(id: IdTarea): Promise<void> {
    const respuesta = await fetch(`${this.API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!respuesta.ok) {
      throw new Error(
        `Error al borrar tarea ${id}: ${respuesta.status} ${respuesta.statusText}`
      );
    }
  }
}
