import { Component, inject, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TaskComponent } from '../../../components/task/task.component';
import { TaskServiceComponent } from '../../../services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [RouterLink, TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  readonly noTaskTitle = 'There are no tasks yet. Start adding some!';

  private taskServ = inject(TaskServiceComponent);
  uId!: string;

  userId = input.required<string>();
  order = input<'asc' | 'desc'>();

  selectedTasks = computed(() =>
    this.taskServ.getSelectedTasks(this.userId()).sort((a, b) => {
      if (this.order() === 'desc') {
        return a.id > b.id ? -1 : 1;
      } else {
        return a.id > b.id ? 1 : -1;
      }
    }),
  );
}
