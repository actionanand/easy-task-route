import { Routes } from '@angular/router';

import { canLeaveEditPage } from './new-task/new-task.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    loadComponent: () => import('./tasks/tasks.component').then(mod => mod.TasksComponent),
  },
  {
    path: 'tasks/new',
    loadComponent: () => import('./new-task/new-task.component').then(mod => mod.NewTaskComponent),
    title: 'New Task',
    canDeactivate: [canLeaveEditPage],
  },
];
