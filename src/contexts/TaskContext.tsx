import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { Task, TaskPayload, taskService } from "../services/taskService";

export enum TasksFilter {
  Today,
  Tomorrow,
  ThisWeek,
  Awaiting,
  Late,
  Inbox,
  Done,
}

export interface TaskContextProps {
  destroy: (id: number) => void;
  selectedFilter: TasksFilter;
  selectedTask?: Task;
  setSelectedFilter: (filter: TasksFilter) => void;
  setSelectedTask: (task?: Task) => void;
  store: (request: TaskPayload) => Task;
  tasks: Task[];
  update: (id: number, request: TaskPayload) => Task | undefined;
}

export const TaskContext = createContext<TaskContextProps>({} as TaskContextProps);

function getStartOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function getEndOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function isBetween(dateValue: string | undefined, start: Date, end: Date): boolean {
  if (!dateValue) return false;

  const time = new Date(dateValue).getTime();

  if (Number.isNaN(time)) return false;

  return time >= start.getTime() && time <= end.getTime();
}

function filterTasks(tasks: Task[], filter: TasksFilter): Task[] {
  const now = new Date();
  const todayStart = getStartOfDay(now);
  const todayEnd = getEndOfDay(now);
  const tomorrowStart = getStartOfDay(addDays(now, 1));
  const tomorrowEnd = getEndOfDay(addDays(now, 1));
  const weekEnd = getEndOfDay(addDays(now, 6));

  switch (filter) {
    case TasksFilter.Today:
      return tasks.filter(
        task => !task.isDone && isBetween(task.deadline, todayStart, todayEnd)
      );

    case TasksFilter.Tomorrow:
      return tasks.filter(
        task => !task.isDone && isBetween(task.deadline, tomorrowStart, tomorrowEnd)
      );

    case TasksFilter.ThisWeek:
      return tasks.filter(task => {
        if (task.isDone || !task.deadline) return false;

        const deadline = new Date(task.deadline).getTime();
        if (Number.isNaN(deadline)) return false;

        return deadline >= todayStart.getTime() && deadline <= weekEnd.getTime();
      });

    case TasksFilter.Awaiting:
      return tasks.filter(task => {
        if (task.isDone || !task.startsAt) return false;

        const startsAt = new Date(task.startsAt).getTime();
        if (Number.isNaN(startsAt)) return false;

        return startsAt > now.getTime();
      });

    case TasksFilter.Late:
      return tasks.filter(task => {
        if (task.isDone || !task.deadline) return false;

        const deadline = new Date(task.deadline).getTime();
        if (Number.isNaN(deadline)) return false;

        return deadline < now.getTime();
      });

    case TasksFilter.Inbox:
      return tasks.filter(task => !task.isDone && !task.startsAt && !task.deadline);

    case TasksFilter.Done:
      return tasks.filter(task => task.isDone);

    default:
      return tasks;
  }
}

export function TaskProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [selectedFilter, setSelectedFilter] = useState<TasksFilter>(TasksFilter.Today);

  const refreshTasks = useCallback(() => {
    setAllTasks(taskService.list());
  }, []);

  const store = useCallback((request: TaskPayload): Task => {
    const task = taskService.store(request);
    refreshTasks();
    return task;
  }, [refreshTasks]);

  const update = useCallback((id: number, request: TaskPayload): Task | undefined => {
    const task = taskService.update(id, request);
    refreshTasks();

    if (selectedTask?.id === id && task) {
      setSelectedTask(task);
    }

    return task;
  }, [refreshTasks, selectedTask]);

  const destroy = useCallback((id: number): void => {
    taskService.destroy(id);
    refreshTasks();

    if (selectedTask?.id === id) {
      setSelectedTask(undefined);
    }
  }, [refreshTasks, selectedTask]);

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  const tasks = useMemo(() => {
    return filterTasks(allTasks, selectedFilter);
  }, [allTasks, selectedFilter]);

  const value = useMemo<TaskContextProps>(() => ({
    destroy,
    selectedFilter,
    selectedTask,
    setSelectedFilter,
    setSelectedTask,
    store,
    tasks,
    update,
  }), [
    destroy,
    selectedFilter,
    selectedTask,
    store,
    tasks,
    update,
  ]);

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export default TaskContext;