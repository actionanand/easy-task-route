import { Component, EventEmitter, Output, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { type TaskData } from '../../../model/task-data.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss',
})
export class NewTaskComponent {
  closeDialog = output<boolean>();
  @Output() addNewTask = new EventEmitter<TaskData>();

  enteredTitle = signal('');
  enteredSummary = '';
  enteredDate = '';

  onCancelNewTask() {
    this.closeDialog.emit(false);
  }

  onSubmit() {
    this.addNewTask.emit({
      title: this.enteredTitle(),
      summary: this.enteredSummary,
      dueDate: this.enteredDate,
    });
  }

  dummyFn() {
    return;
  }
}
