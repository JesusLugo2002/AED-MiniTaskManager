import { ALL } from "dns";

/**
 * Represents a task.
 */
export interface Task {
  /**
   * Unique identifier,
   */
  id: number;
  /**
   * Task title.
   */
  title: string;
  /**
   * Optional task description.
   */
  description?: string;
  /**
   * Completed status.
   */
  completed: boolean;
}

export type TaskId = number;

export enum TaskFilter {
  ALL, PENDING, COMPLETED
}