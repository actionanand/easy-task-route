import { Routes } from '@angular/router';

import { NoTaskComponent } from './pages/no-task/no-task.component';
import { UserTaskComponent } from './pages/user-task/user-task.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { routes as userTaskRoutes } from './pages/user-task/task.routes';

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId',
    component: UserTaskComponent,
    children: userTaskRoutes,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
