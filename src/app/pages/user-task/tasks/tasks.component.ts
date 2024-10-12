import { Component, inject, Input } from '@angular/core';

import { TaskComponent } from '../../../components/task/task.component';
import { type Task } from '../../../model/task-data.model';
import { TaskServiceComponent } from '../../../services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  readonly noTaskTitle = 'There are no tasks yet. Start adding some!';

  selectedTasks: Task[] = [];

  private taskServ = inject(TaskServiceComponent);

  @Input({ required: true })
  set userId(uid: string) {
    this.selectedTasks = this.taskServ.getSelectedTasks(uid);
  }
}
