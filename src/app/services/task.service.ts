import { Injectable } from '@angular/core';

import { dummyTasks } from '../shared/local-data/dummy-tasks';
import { type TaskData, type Task } from '../model/task-data.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceComponent {
  private tasks: Task[] = dummyTasks;
  private isNewTaskCompActv = new BehaviorSubject<boolean>(false);

  isNewTaskCompActv$ = this.isNewTaskCompActv.asObservable();

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  getTasks() {
    return this.tasks.slice();
  }

  getSelectedTasks(userId: string) {
    return this.tasks.filter(task => task.userId === userId);
  }

  removeTask(taskId: string) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasksOnLocalStorage();
  }

  addNewTask(task: TaskData, userId: string) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      title: task.title,
      summary: task.summary,
      dueDate: task.dueDate,
      userId,
    });

    this.saveTasksOnLocalStorage();
  }

  changeNewTaskCompState(state = false) {
    this.isNewTaskCompActv.next(state);
  }

  private saveTasksOnLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
