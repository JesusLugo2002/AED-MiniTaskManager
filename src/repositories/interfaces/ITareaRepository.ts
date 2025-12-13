import { IdTarea, Tarea } from "../../models/models";

export default interface ITareaRepository {
  findAll(): Tarea[] | Promise<Tarea[]>;
  findById(id: IdTarea): Tarea | undefined | Promise<Tarea | undefined>;
  create(title: string, description?: string): Tarea | Promise<Tarea>;
  update(task: Tarea): Tarea | undefined | Promise<Tarea | undefined>;
  deleteById(id: number): boolean | Promise<boolean>;
}
