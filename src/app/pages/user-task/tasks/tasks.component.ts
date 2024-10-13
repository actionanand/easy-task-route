import { Component, inject, input, computed, OnInit, signal, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TaskComponent } from '../../../components/task/task.component';
import { TaskServiceComponent } from '../../../services/task.service';
import { Task } from '../../../model/task-data.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [RouterLink, TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  readonly noTaskTitle = 'There are no tasks yet. Start adding some!';

  private taskServ = inject(TaskServiceComponent);
  private tasks = signal<Task[]>([]);
  uId!: string;

  @Input({ required: true })
  set userId(id: string) {
    this.uId = id;
    this.getTasksForThisUser();
  }

  order = input<'asc' | 'desc'>();

  ngOnInit(): void {
    this.getTasksForThisUser();
  }

  selectedTasks = computed(() =>
    this.tasks().sort((a, b) => {
      if (this.order() === 'desc') {
        return a.id > b.id ? -1 : 1;
      } else {
        return a.id > b.id ? 1 : -1;
      }
    }),
  );

  onCompleteTask(taskId: string) {
    this.taskServ.removeTask(taskId);
    this.getTasksForThisUser();
  }

  private getTasksForThisUser() {
    this.tasks.set(this.taskServ.getSelectedTasks(this.uId));
  }
}
