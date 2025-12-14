import * as readline from "readline/promises";
import {
  askStatus,
  askTaskId,
  askTitleDescription,
  chooseFilter,
  chooseOperation,
  chooseRepository,
} from "./cli/cli";
import { TaskService } from "./services/TaskService";
import { Task, TaskFilter } from "./models/models";
import ITaskRepository from "./repositories/interfaces/ITaskRepository";
import { TaskRepositoryLocal } from "./repositories/TaskRepositoryLocal";
import { TaskRepositoryRemote } from "./repositories/TaskRepositoryRemote";

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("-=- Welcome to my mini task manager -=-");
  let repository: ITaskRepository | undefined = undefined;

  switch (await chooseRepository(rl)) {
    case "1":
      console.log("Local database connected!\n");
      repository = new TaskRepositoryLocal();
      break;
    case "2":
      console.log("Remote database connected!\n");
      repository = new TaskRepositoryRemote();
      break;
    default:
      console.log("Invalid option");
      break;
  }

  if (repository == undefined) {
    rl.close();
    return;
  }

  const service = new TaskService(repository);

  switch (await chooseOperation(rl)) {
    case "1":
      switch (await chooseFilter(rl)) {
        case "2":
          console.log("\nShowing pending tasks...\n");
          console.log(await service.findAllWithFilter(TaskFilter.PENDING));
          break;
        case "3":
          console.log("\nShowing completed tasks...\n");
          console.log(await service.findAllWithFilter(TaskFilter.COMPLETED));
          break;
        case "1":
        default:
          console.log("\nShowing all tasks...\n");
          console.log(await service.findAllWithFilter(TaskFilter.ALL));
          break;
      }
      break;

    case "2":
      const findId = Number(await askTaskId(rl));
      const result = await service.findById(findId);
      console.log(result == undefined ? "Task not found!" : result);
      break;

    case "3":
      console.log("\nCreating a task...");
      const answer = await askTitleDescription(rl);
      console.log(await service.create(answer.title, answer.description));
      break;

    case "4":
      console.log("\nDeleting a task...\n");
      const deleteId = Number(await askTaskId(rl));
      console.log(
        (await service.deleteById(deleteId))
          ? "Task deleted"
          : "Task not found / not deleted"
      );
      break;

    case "5":
      console.log("\nUpdating a task...\n");
      const updateId = Number(await askTaskId(rl));
      const updatedInfo = await askTitleDescription(rl);
      const newStatus = await askStatus(rl);
      const newTask: Task = {
        id: updateId,
        title: updatedInfo.title,
        description: updatedInfo.description,
        completed: newStatus,
      };
      console.log(await service.update(newTask));
      break;
    default:
      console.log("\nERROR: Invalid option\n");
      break;
  }

  rl.close();
}

main().catch((error) => {
  console.error("Error en main:", error);
});
