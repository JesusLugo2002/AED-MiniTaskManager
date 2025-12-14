<div align=justify>

# MiniTaskManager

## ¿Cómo se ejecuta el proyecto?

Ejecute el fichero `run.sh` haciendo *click* en él o escribiendo en la terminal `./run.sh`.

## Estructura del proyecto

```code
./src/
├── cli
│   └── cli.ts -> Contiene usos del módulo Readline para realizar preguntas al usuario.
├── database
│   └── db.ts -> Función auxiliar para la generación de la base de datos.
├── models
│   └── models.ts -> Contiene interfaces y tipos de modelos fundamentales.
├── repositories
│   ├── TaskRepositoryLocal.ts -> Repositorio que gestiona la información local.
│   ├── TaskRepositoryRemote.ts -> Repositorio que gestiona la información remota en la API.
│   └── interfaces
│       └── ITaskRepository.ts
├── services
│   └── TaskService.ts -> Servicio que gestiona las operaciones básicas.
├── index.ts -> Fichero principal del programa.
```

## Endpoints remotos

1. **/api/tasks** - **Método GET** - Obtiene todas las tareas.
2. **/api/tasks/<task_id>** - **Método GET** - Obtiene la información de la tarea con id `task_id`.
3. **/api/tasks/** - **Método POST** - Crea una tarea nueva pasando por el *request body* el título y la descripción.
4. **/api/tasks/<task_id>** - **Método PUT** - Actualiza la tarea con id `task_id`.
5. **/api/tasks/<task_id>** - **Método DELETE** - Elimina la tarea con id `task_id`.

</div>