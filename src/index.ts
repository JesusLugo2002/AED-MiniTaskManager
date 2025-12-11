import * as readline from "readline";
import { RepositorioTareasSqlite } from "./repositories/repositorioTareasSqlite";
import { repositorioTareasRemoto } from "./repositories/repositorioTareasRemoto";
import { ServicioTareas } from "./services/servicioTareas";
import ITareaRepository from "./repositories/interfaces/ITareaRepository";

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let repository: ITareaRepository | undefined = undefined;

  console.log("-=- Welcome to my mini task manager -=-");
  rl.question(
    "What mode do you want to use? (offline|online|exit) -> ",
    (answer: string) => {
      switch (answer.toLowerCase().trim()) {
        case "offline":
          console.log("Local database connected!\n");
          repository = new RepositorioTareasSqlite();
          break;
        case "online":
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

      rl.question(
        "What operation what to do?\n[1] Get all the tasks\n[2] Find one by ID\n[3] Create a new task\n[4] Update an existent task\n[5] Delete an existent task\n--> ",
        (answer: string) => {
          switch (answer.trim()) {

            case "1":
              rl.question(
                "Filter?\n[1] All tasks\n[2] Pending tasks\n[3] Completed tasks\n--> ",
                (answer: string) => {
                  switch (answer.trim()) {
                    case "2":
                      console.log("\nShowing pending tasks\n");
                      break;
                    case "3":
                      console.log("\nShowing completed tasks\n");
                      break;
                    case "1":
                    default:
                      console.log("\nShowing all the tasks\n");
                      break;
                  }
                }
              );
              break;

            case "2":
              rl.question(
                "What ID do you looking for? --> ", (answer: string) => {
                  console.log(`\nShowing task with ID ${answer}\n`);
                }
              )
              break;

            case "3":
              break;

            case "4":
              break;
            case "5":
              break;
            default:
              break;
          }
          rl.close();
        }
      );
    }
  );
}

main().catch((error) => {
  console.error("Error en main:", error);
});
