import { LocalStorageKeys } from "../constants";
import { AuthResponse, Task, TaskDTO } from "../interfaces";

export const getLocalStorage = <T>(key: string) => {
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data) as T) : undefined;
};

export const setLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const getLocalStorageToken = (): string | undefined => {
  const response = getLocalStorage<AuthResponse>(LocalStorageKeys.DATA);
  return response?.token;
};

export const getTasksOfLocalStorage = (): Task[] => {
  const response = getLocalStorage<Task[]>(LocalStorageKeys.TASKS);
  return response || [];
};

export const setTasksToLocalStorage = (tasks: Task[]): void => {
  setLocalStorage(LocalStorageKeys.TASKS, tasks);
};

export const addTaskToLocalStorage = (task: TaskDTO): Task => {
  const tasks = getTasksOfLocalStorage();
  const newTask = {
    ...task,
    task_id: Math.random().toString(),
    completed: false,
    created_at: new Date(),
  };
  setTasksToLocalStorage([...tasks, newTask]);
  return newTask;
};

export const toggleTaskStatusInLocalStorage = (taskId: string): void => {
  const tasks = getTasksOfLocalStorage();
  const newTasks = tasks.map((task) => {
    if (task.task_id === taskId) {
      return {
        ...task,
        completed: !task.completed,
      };
    }
    return task;
  });
  setTasksToLocalStorage(newTasks);
}

export const removeSelectedTasksFromLocalStorage = (taskIds: string[]): void => {
  const tasks = getTasksOfLocalStorage();
  const newTasks = tasks.filter((task) => !taskIds.includes(task.task_id));
  setTasksToLocalStorage(newTasks);
}
export const removeTaskFromLocalStorage = (taskId: string): void => {
  const tasks = getTasksOfLocalStorage();
  const newTasks = tasks.filter((task) => task.task_id !== taskId);
  setTasksToLocalStorage(newTasks);
};

export const removeTasksFromLocalStorage = (): void => {
  removeLocalStorage(LocalStorageKeys.TASKS);
}

