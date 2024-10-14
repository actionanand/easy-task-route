/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanMatchFn, RedirectCommand, Route, Router, Routes, UrlSegment } from '@angular/router';
import { inject } from '@angular/core';

import { NoTaskComponent } from './pages/no-task/no-task.component';
import { resolveTitle, resolveUserName, UserTaskComponent } from './pages/user-task/user-task.component';
// import { routes as userTaskRoutes } from './pages/user-task/task.routes';

const dummyMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();

  if (shouldGetAccess < 0.9) {
    return true;
  }

  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No Task Selected',
  },
  {
    path: 'users/:userId',
    component: UserTaskComponent,
    loadChildren: () => import('./pages/user-task/task.routes').then(mod => mod.routes),
    // children: userTaskRoutes,
    canMatch: [dummyMatch],
    // runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    data: { message: 'Hello World!' },
    resolve: {
      userName: resolveUserName,
    },
    title: resolveTitle,
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(mod => mod.NotFoundComponent),
    title: 'Page Not Found - 404!',
  },
];
