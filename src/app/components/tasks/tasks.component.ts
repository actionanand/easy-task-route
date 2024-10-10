import { Component, Input, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskServiceComponent } from '../../services/task.service';

import { capitalize1stLetter } from '../../shared/functions/capitalize1stLetter';
import { type TaskData } from '../../model/task-data.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  constructor(private taskServ: TaskServiceComponent) {}

  name = input('Test User', {
    alias: 'peyar',
    transform: (value: string) => capitalize1stLetter(value),
  });

  @Input({ required: true }) id!: string;

  isAddingTask = false;

  get selectedTasks() {
    return this.taskServ.getSelectedTasks(this.id);
  }

  onCompleteTask(id: string) {
    this.taskServ.removeTask(id);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  OnAddNewTask(task: TaskData) {
    this.taskServ.addNewTask(task, this.id);
    this.isAddingTask = false;
  }

  onCloseDialog(isDialogOpen: boolean) {
    this.isAddingTask = isDialogOpen;
  }
}
