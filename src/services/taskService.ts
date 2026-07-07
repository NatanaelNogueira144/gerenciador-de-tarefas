const TASKS_STORAGE_KEY = '@gerenciador-de-tarefas:tasks';

export interface TaskChecklistItem {
  description: string;
  isChecked: boolean;
}

export interface TaskChecklist {
  items: TaskChecklistItem[];
}

export interface Task {
  id: number;
  name: string;
  description: string;
  startsAt?: string;
  deadline?: string;
  checklist?: TaskChecklist;
  isDone: boolean;
}

export interface TaskPayload {
  name: string;
  description: string;
  startsAt?: string;
  deadline?: string;
  checklist?: TaskChecklist;
  isDone: boolean;
}

function readTasks(): Task[] {
  const raw = localStorage.getItem(TASKS_STORAGE_KEY);

  if (!raw) return [];

  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    localStorage.removeItem(TASKS_STORAGE_KEY);
    return [];
  }
}

function writeTasks(tasks: Task[]): void {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

export const taskService = {
  list(): Task[] {
    return readTasks();
  },

  show(id: number): Task | undefined {
    return readTasks().find(task => task.id === id);
  },

  store(payload: TaskPayload): Task {
    const tasks = readTasks();

    const task: Task = {
      id: Date.now(),
      ...payload,
    };

    tasks.push(task);
    writeTasks(tasks);

    return task;
  },

  update(id: number, payload: TaskPayload): Task | undefined {
    const tasks = readTasks();
    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) return undefined;

    const updatedTask: Task = {
      ...tasks[index],
      ...payload,
      id,
    };

    tasks[index] = updatedTask;
    writeTasks(tasks);

    return updatedTask;
  },

  destroy(id: number): boolean {
    const tasks = readTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);

    if (filteredTasks.length === tasks.length) {
      return false;
    }

    writeTasks(filteredTasks);
    return true;
  },
};