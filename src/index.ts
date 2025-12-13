import * as readline from "readline/promises";
import { ServicioTareas } from "./services/servicioTareas";
import ITareaRepository from "./repositories/interfaces/ITareaRepository";
import {
  askStatus,
  askTaskId,
  askTitleDescription,
  chooseFilter,
  chooseOperation,
  chooseRepository,
} from "./cli/cli";
import { RepositorioTareasSqlite } from "./repositories/repositorioTareasSqlite";
import { repositorioTareasRemoto } from "./repositories/repositorioTareasRemoto";
import { Tarea } from "./models/models";

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("-=- Welcome to my mini task manager -=-");
  let repository: ITareaRepository | undefined = undefined;

  switch (await chooseRepository(rl)) {
    case "1":
      console.log("Local database connected!\n");
      repository = new RepositorioTareasSqlite();
      break;
    case "2":
      console.log("Remote database connected!\n");
      repository = new repositorioTareasRemoto();
      break;
    default:
      console.log("Invalid option");
      break;
  }

  if (repository == undefined) {
    rl.close();
    return;
  }

  const service = new ServicioTareas(repository);

  switch (await chooseOperation(rl)) {
    case "1":
      switch (await chooseFilter(rl)) {
        case "2":
          console.log("\nShowing pending tasks...\n");
          console.log(service.findAllWithFilter("pendientes"));
          break;
        case "3":
          console.log("\nShowing completed tasks...\n");
          console.log(service.findAllWithFilter("completadas"));
          break;
        case "1":
        default:
          console.log("\nShowing all tasks...\n");
          console.log(service.findAllWithFilter("todas"));
          break;
      }
      break;

    case "2":
      const findId = Number(await askTaskId(rl));
      const result = service.findById(findId);
      console.log(result == undefined ? "Task not found!" : result);
      break;

    case "3":
      console.log("\nCreating a task...");
      const answer = await askTitleDescription(rl);
      console.log(service.create(answer.title, answer.description));
      break;

    case "4":
      console.log("\nDeleting a task...\n");
      const deleteId = Number(await askTaskId(rl));
      console.log(
        service.deleteById(deleteId)
          ? "Task deleted"
          : "Task not found / not deleted"
      );
      break;

    case "5":
      console.log("\nUpdating a task...\n");
      const updateId = Number(await askTaskId(rl));
      const updatedInfo = await askTitleDescription(rl);
      const newStatus = await askStatus(rl);
      const newTask: Tarea = {
        id: updateId,
        titulo: updatedInfo.title,
        descripcion: updatedInfo.description,
        completada: newStatus,
      };
      console.log(service.update(newTask))
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
