import { Component, inject, Input } from '@angular/core';
// import { computed, input } from '@angular/core';

import { TaskComponent } from '../../components/tasks/task/task.component';
import { NewTaskComponent } from '../../components/tasks/new-task/new-task.component';
import { TaskServiceComponent } from '../../services/task.service';

import { capitalize1stLetter } from '../../shared/functions/capitalize1stLetter';
import { type TaskData } from '../../model/task-data.model';
import { UserServiceComponent } from '../../services/user.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  readonly noTaskTitle = 'There are no tasks yet. Start adding some!';
  userName = '';
  uId!: string;

  private userServ = inject(UserServiceComponent);

  // @Input({ required: true }) userId!: string;
  // userId = input.required();

  @Input({ required: true })
  set userId(id: string) {
    const uName = this.userServ.findUser(id)?.name;
    this.userName = capitalize1stLetter(uName);
    this.uId = id;
  }

  constructor(private taskServ: TaskServiceComponent) {}

  /*
  name = computed(
    () => {
      const uName = this.userServ.findUser(this.userId)?.name;
      return capitalize1stLetter(uName);
    }
  );
  */

  isAddingTask = false;

  get selectedTasks() {
    return this.taskServ.getSelectedTasks(this.uId);
  }

  onCompleteTask(userId: string) {
    this.taskServ.removeTask(userId);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  OnAddNewTask(task: TaskData) {
    this.taskServ.addNewTask(task, this.uId);
    this.isAddingTask = false;
  }

  onCloseDialog(isDialogOpen: boolean) {
    this.isAddingTask = isDialogOpen;
  }
}
