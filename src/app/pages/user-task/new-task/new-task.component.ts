import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

import { TaskServiceComponent } from '../../../services/task.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  isSubmitted = false;
  private tasksServ = inject(TaskServiceComponent);
  private router = inject(Router);

  onSubmit() {
    this.tasksServ.addNewTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        dueDate: this.enteredDate(),
      },
      this.userId(),
    );

    this.isSubmitted = true;

    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true,
    });
  }
}

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = Component => {
  const warningMsg = 'Are you sure to leave the page? Your edit data will be lost!';

  if (Component.isSubmitted === true) {
    return true;
  }

  if (Component.enteredTitle() || Component.enteredDate() || Component.enteredSummary()) {
    return confirm(warningMsg);
  }
  return true;
};
