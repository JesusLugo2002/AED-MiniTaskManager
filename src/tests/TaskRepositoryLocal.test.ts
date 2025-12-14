import Database from "better-sqlite3";
import { TaskRepositoryLocal } from "../repositories/TaskRepositoryLocal";

describe("Testing local repository", () => {

    const dbTest = new Database(":memory:");
    dbTest.exec(`
        CREATE TABLE IF NOT EXISTS tareas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descripcion TEXT,
        completada INTEGER NOT NULL
        )
    `);
    const repository = new TaskRepositoryLocal(dbTest);

    const testTask1 = { "title": "Test 1" }
    const testTask2 = { "title": "Test 2", "description": "With description" }
    const testTask3 = { "title": "Test 3" }

    test("createTasks create three tasks", () => {
        const created1 = repository.create(testTask1.title);
        const created2 = repository.create(testTask2.title, testTask2.description );
        const created3 = repository.create(testTask3.title);

        expect(created1.id).not.toBeNull();
        expect(created2.id).not.toBeNull();
        expect(created3.id).not.toBeNull();
    });
    
    test("findAll find all tasks", () => {
        expect(repository.findAll().length).toBe(3)
    })

    test("findById find a specific task with id", () => {
        const taskFound = repository.findById(2);
        expect(taskFound).not.toBeUndefined();
        expect(taskFound?.title).toEqual(testTask2.title)
        expect(taskFound?.description).toEqual(testTask2.description)
    })

    test("deleteById delete a task with id", () => {
        const deleted = repository.deleteById(3);
        expect(deleted).toBe(true);
        expect(repository.findAll().length).toBe(2);
    })
});