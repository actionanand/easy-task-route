import { Routes } from '@angular/router';

import { TasksComponent } from './pages/tasks/tasks.component';
import { NoTaskComponent } from './pages/no-task/no-task.component';

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId/tasks',
    component: TasksComponent,
  },
];
