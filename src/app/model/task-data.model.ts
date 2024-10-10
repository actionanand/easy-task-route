export interface TaskData {
  title: string;
  summary: string;
  dueDate: string;
}

export interface Task extends TaskData {
  id: string;
  userId: string;
}
