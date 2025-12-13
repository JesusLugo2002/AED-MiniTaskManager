import { Tarea, IdTarea } from "../models/models";
import ITareaRepository from "./interfaces/ITareaRepository";

export class repositorioTareasRemoto implements ITareaRepository {
  private API_URL = "http://localhost:8080/api/tasks";

  async findAll(): Promise<Tarea[]> {
    let data = [];
    try {
      const response = await fetch(this.API_URL);
      data = await response.json();
    } catch (err) {
      console.error("Something happend while trying fetch all tasks", err);
    }
    return data;
  }

  async findById(id: IdTarea): Promise<Tarea | undefined> {
    let data = undefined;
    try {
      const response = await fetch(`${this.API_URL}/${id}`);
      data = await response.json();
    } catch (err) {
      console.error(
        `Something happend while trying fetch the task with ID ${id}`,
        err
      );
    }
    return data;
  }

  async create(title: string, description?: string): Promise<Tarea> {
    let data;
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, description: description }),
      };
      const response = await fetch(this.API_URL, options);
      data = await response.json();
    } catch (err) {
      console.error(`Something happend while trying create a new task`, err);
    }
    return data;
  }

  async update(task: Tarea): Promise<Tarea | undefined> {
    let data = undefined;
    const taskId = task.id;
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      };
      const response = await fetch(`${this.API_URL}/${taskId}`, options);
      data = await response.json();
    } catch (err) {
      console.error(
        `Something happend while trying to update the task with ID ${taskId}`,
        err
      );
    }
    return data;
  }

  async deleteById(id: number): Promise<boolean> {
    const options = { method: "DELETE" };
    const response = await fetch(`${this.API_URL}/${id}`, options);
    return response.ok;
  }
}
