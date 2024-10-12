import { Routes } from '@angular/router';

import { TasksComponent } from './pages/user-task/tasks/tasks.component';
import { NoTaskComponent } from './pages/no-task/no-task.component';
import { UserTaskComponent } from './pages/user-task/user-task.component';
import { NewTaskComponent } from './pages/user-task/new-task/new-task.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId',
    component: UserTaskComponent,
    children: [
      {
        path: 'tasks',
        component: TasksComponent,
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
