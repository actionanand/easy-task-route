import { Routes } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';
import { canLeaveEditPage, NewTaskComponent } from './new-task/new-task.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TasksComponent,
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    title: 'New Task',
    canDeactivate: [canLeaveEditPage],
  },
];
