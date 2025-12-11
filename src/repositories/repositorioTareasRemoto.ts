import { Tarea, IdTarea } from "../models/models";

export type NuevaTarea = Omit<Tarea, "id">;

export class repositorioTareasRemoto {
  private API_URL = "http://localhost:3000/tareas";

  async obtenerTareas(): Promise<Tarea[]> {
    const respuesta = await fetch(this.API_URL);
    if (!respuesta.ok) {
      throw new Error(
        `Error al cargar tareas: ${respuesta.status} ${respuesta.statusText}`
      );
    }
    const datos: unknown = await respuesta.json();
    return datos as Tarea[];
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
