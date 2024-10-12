import { Component } from '@angular/core';

@Component({
  selector: 'app-no-task',
  standalone: true,
  imports: [],
  templateUrl: './no-task.component.html',
  styleUrl: './no-task.component.scss',
})
export class NoTaskComponent {
  readonly fallbackStatement = 'Select a user to see their tasks!';
}
