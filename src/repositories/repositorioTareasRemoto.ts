import { Tarea, IdTarea } from "../models/models";
import ITareaRepository from "./interfaces/ITareaRepository";

export class repositorioTareasRemoto implements ITareaRepository {
  private API_URL = "http://localhost:8080/api/tasks";

  async findAll(): Promise<Tarea[]> {
    const response = await fetch(this.API_URL);
    const data = await response.json();
    return data;
  }

  async findById(id: IdTarea): Promise<Tarea | undefined> {
    const response = await fetch(`${this.API_URL}/${id}`)
    const data = await response.json();
    return data;
  }
  
  async create(title: string, description?: string): Promise<Tarea> {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, description: description }),
    };
    const response = await fetch(this.API_URL, options);
    const data = await response.json();
    return data;
  }

  async update(task: Tarea): Promise<Tarea | undefined> {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    };
    const response = await fetch(`${this.API_URL}/${task.id}`, options);
    const data = await response.json();
    return data;
  }

  async deleteById(id: number): Promise<boolean> {
    const options = { method: "DELETE" }
    const response = await fetch(`${this.API_URL}/${id}`, options);
    return response.ok;
  }
}
