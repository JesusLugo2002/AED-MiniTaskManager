import { IdTarea, Tarea } from "../../models/models";

export default interface ITareaRepository {
    findAll(): Tarea[];
    findById(id: IdTarea): Tarea|undefined;
    create(title: string, description?: string): Tarea;
    update(task: Tarea): Tarea|undefined;
    deleteById(id: number): boolean;
}