import { Routes } from '@angular/router';

import { NoTaskComponent } from './pages/no-task/no-task.component';
import { resolveTitle, resolveUserName, UserTaskComponent } from './pages/user-task/user-task.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { routes as userTaskRoutes } from './pages/user-task/task.routes';

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No Task Selected',
  },
  {
    path: 'users/:userId',
    component: UserTaskComponent,
    children: userTaskRoutes,
    // runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    data: { message: 'Hello World!' },
    resolve: {
      userName: resolveUserName,
    },
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Page Not Found - 404!',
  },
];
