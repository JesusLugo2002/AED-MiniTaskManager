import { Task, TaskId, TaskFilter } from "../models/models";
import ITaskRepository from "../repositories/interfaces/ITaskRepository";

/**
 * Class TaskService.
 * Handle task operations.
 *
 * @author JesusLugo2002
 */
export class TaskService {
  /**
   * Constructor with repository.
   * @param repository - Repository to use.
   */
  constructor(private repository: ITaskRepository) {}

  /**
   * Find all tasks and apply (optionally) a filter.
   * @param filter - Task filter (all|pending|completed)
   * @returns The filtered task list.
   */
  async findAllWithFilter(filter: TaskFilter): Promise<Task[]> {
    const tasks = await this.repository.findAll();
    switch (filter) {
      case TaskFilter.PENDING:
        return tasks.filter((t) => !t.completed);
      case TaskFilter.COMPLETED:
        return tasks.filter((t) => t.completed);
      case TaskFilter.ALL:
      default:
        return tasks;
    }
  }

  /**
   * Create a new task.
   * @param title - Task title.
   * @param description - Optional task description.
   * @returns Created task.
   */
  async create(title: string, description?: string): Promise<Task> {
    if (!title || title.trim().length === 0) {
      throw new Error("The title must be not empty!");
    }
    return await this.repository.create(title, description);
  }

  /**
   * Find a task by id.
   * @param id - Unique identifier.
   * @returns Task found.
   */
  async findById(id: TaskId): Promise<Task | undefined> {
    if (id == null) {
      throw new Error("The id must be not null.");
    }
    return await this.repository.findById(id);
  }

  /**
   * Update an existent task.
   * @param tarea - Task to update.
   * @returns Updated task.
   */
  async update(task: Task): Promise<Task | undefined> {
    return await this.repository.update(task);
  }

  /**
   * Delete an existent task by id.
   * @param id - Unique identifier.
   * @returns True if deleted, otherwise, false.
   */
  async deleteById(id: TaskId): Promise<boolean> {
    if (id == null) {
      throw new Error("The id must be not null.");
    }
    return await this.repository.deleteById(id);
  }
}
