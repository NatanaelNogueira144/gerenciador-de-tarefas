import useAPI from "../hooks/useAPI";
import { ISaveTaskRequest } from "../../core/interfaces/requests/save-task-request.interface";
import { ITask } from "../../core/interfaces/models/task.interface";
import { TasksList } from "../../core/types/tasks-list.type";
import { createContext, useEffect, useState } from "react";

export enum TasksFilter {
    Today,
    Tomorrow,
    ThisWeek,
    Awaiting,
    Late,
    Inbox,
    Done
}

export interface TaskContextProps {
    destroy: (id: number) => void;
    selectedFilter: TasksFilter;
    selectedTask?: ITask;
    setSelectedFilter: (filter: TasksFilter) => void;
    setSelectedTask: (task?: ITask) => void;
    store: (request: ISaveTaskRequest) => ITask;
    tasks: TasksList;
    update: (id: number, request: ISaveTaskRequest) => ITask;
}

export const TaskContext = createContext<TaskContextProps>({} as TaskContextProps);

export function TaskProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const { api } = useAPI();
    const [tasks, setTasks] = useState([] as TasksList);
    const [selectedTask, setSelectedTask] = useState(undefined as undefined|ITask);
    const [selectedFilter, setSelectedFilter] = useState(TasksFilter.Today);

    const getFilteredTasks = (tasks: TasksList, filter: TasksFilter): TasksList => {
        const now = Date.now();
        const dayInMilliseconds = 86400000;

        if(filter === TasksFilter.Today) {
            tasks = tasks.filter(t => !t.isDone 
                && t.deadline 
                && now > new Date(t.deadline).getTime() 
                && now < new Date(t.deadline).getTime() + dayInMilliseconds);
        } else if(filter === TasksFilter.Tomorrow) {
            tasks = tasks.filter(t => !t.isDone 
                && t.deadline 
                && now > new Date(t.deadline).getTime() - dayInMilliseconds
                && now < new Date(t.deadline).getTime() + dayInMilliseconds);
        } else if(filter === TasksFilter.ThisWeek) {
            tasks = tasks.filter(t => !t.isDone 
                && t.deadline 
                && now > new Date(t.deadline).getTime() - dayInMilliseconds * 6
                && now < new Date(t.deadline).getTime() + dayInMilliseconds);
        } else if(filter === TasksFilter.Awaiting) {
            tasks = tasks.filter(t => !t.isDone && t.startsAt && now < new Date(t.startsAt).getTime());
        } else if(filter === TasksFilter.Late) {
            tasks = tasks.filter(t => !t.isDone && t.deadline && now > new Date(t.deadline).getTime());
        } else if(filter === TasksFilter.Inbox) {
            tasks = tasks.filter(t => !t.isDone && !t.startsAt && !t.deadline);
        } else if(filter === TasksFilter.Done) {
            tasks = tasks.filter(t => t.isDone);
        }

        return tasks;
    }

    const store = (request: ISaveTaskRequest): ITask => {
        const task = api.tasks.store(request);
        setTasks(getFilteredTasks(api.tasks.list(), selectedFilter));
        return task;
    }

    const update = (id: number, request: ISaveTaskRequest): ITask => {
        const task = api.tasks.update(id, request);
        setTasks(getFilteredTasks(api.tasks.list(), selectedFilter));
        return task;
    }

    const destroy = (id: number): void => {
        api.tasks.destroy(id);
        setTasks(getFilteredTasks(api.tasks.list(), selectedFilter));
    }

    useEffect(() => {
        setTasks(getFilteredTasks(api.tasks.list(), selectedFilter));
    }, [api.tasks, selectedFilter]);

    return (
        <TaskContext.Provider value={{ 
            destroy,
            selectedFilter,
            selectedTask, 
            setSelectedFilter,
            setSelectedTask, 
            store,
            tasks,
            update,
        }}>
            {children}
        </TaskContext.Provider>
    );
}

export default TaskContext;
