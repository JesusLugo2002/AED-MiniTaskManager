import * as readline from "readline/promises";

export async function chooseRepository(rl: readline.Interface) {
  const choose = await rl.question(
    `What mode do you want to use?
[1] Offline (Local database)
[2] Online (Remote database)
--> `
  );
  return choose.trim().toLowerCase();
}

export async function chooseOperation(rl: readline.Interface) {
  const choose = await rl.question(
    `What operation do you want to do?
[1] Get all tasks
[2] Read task by ID
[3] Create a new task
[4] Delete an existent task by ID
[5] Update an existent task by ID
--> `
  );
  return choose.trim();
}

export async function chooseFilter(rl: readline.Interface) {
  const choose = await rl.question(`
What filter want to use?
[1] All tasks
[2] Pending tasks
[3] Completed tasks
--> `);
  return choose.trim();
}

export async function askTaskId(rl: readline.Interface) {
  const id = await rl.question(`\nWrite the task ID --> `);
  return id.trim();
}

export async function askTitleDescription(rl: readline.Interface) {
  const title = await rl.question("Title: ");
  const description = await rl.question("Description? (Optional): ");
  return {
    "title": title, "description": description
  }
}

export async function askStatus(rl: readline.Interface) {
  const answer = await rl.question(`Is completed? (Y/n) --> `);
  switch (answer.trim().toLowerCase()) {
    case "n":
      return false;
    case "y":
    default:
      return true;
  }
}