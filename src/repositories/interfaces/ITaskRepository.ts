import { TaskId, Task } from "../../models/models";

export default interface ITaskRepository {
  /**
   * Return all the tasks.
   */
  findAll(): Task[] | Promise<Task[]>;

  /**
   * Return the task found by an identifier, if not exists, returns undefined.
   * @param id - Unique identifier
   */
  findById(id: TaskId): Task | undefined | Promise<Task | undefined>;

  /**
   * Create a new task with title and an optional description.
   * @param title - Task title
   * @param description - Task description
   */
  create(title: string, description?: string): Task | Promise<Task>;

  /**
   * Update an existent task
   * @param task - Task to update.
   */
  update(task: Task): Task | undefined | Promise<Task | undefined>;

  /**
   * Delete an existent task by identifier.
   * @param id - Unique identifier
   */
  deleteById(id: number): boolean | Promise<boolean>;
}
