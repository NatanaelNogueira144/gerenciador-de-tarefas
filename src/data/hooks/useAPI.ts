import useLocalStorage from "./useLocalStorage";
import { ISaveTaskRequest } from "../../core/interfaces/requests/save-task-request.interface";
import { ITask } from "../../core/interfaces/models/task.interface";
import { TasksList } from "../../core/types/tasks-list.type";
import { useMemo } from "react";

export default function useAPI() {
    const { get, set } = useLocalStorage();

    const api = useMemo(() => ({
        tasks: {
            list: (): TasksList => (get('@gerenciador-de-tarefas:tasks') ?? []) as TasksList,
            show: (id: number): ITask => api.tasks.list().find(o => o.id === id)!,
            store: (request: ISaveTaskRequest): ITask => {
                const list = api.tasks.list();
                const task = { id: Date.now(), ...request } as ITask;
                list.push(task);
                set('@gerenciador-de-tarefas:tasks', list);

                return task;
            },
            update: (id: number, request: ISaveTaskRequest): ITask => {
                const list = api.tasks.list();
                let task = list.find(o => o.id === id)!;
                task = {...task, ...request} as ITask;
                list[list.findIndex(o => o.id === id)] = task;
                set('@gerenciador-de-tarefas:tasks', list);
                
                return task;
            },
            destroy: (id: number): void => {
                const list = api.tasks.list().filter(t => t.id !== id);
                set('@gerenciador-de-tarefas:tasks', list);
            },
        }
    }), [get, set]);

    return { api };
}