/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';
// import { Input } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { DestroyRef } from '@angular/core';

import { TaskComponent } from '../../components/task/task.component';
import { capitalize1stLetter } from '../../shared/functions/capitalize1stLetter';
import { UserServiceComponent } from '../../services/user.service';
import { TaskServiceComponent } from '../../services/task.service';

@Component({
  selector: 'app-user-task',
  standalone: true,
  imports: [RouterLink, RouterOutlet, TaskComponent],
  templateUrl: './user-task.component.html',
  styleUrl: './user-task.component.scss',
})
export class UserTaskComponent implements OnInit {
  // private userServ = inject(UserServiceComponent);
  userId = input.required<string>();
  message = input<string>();
  userName = input<string>();
  isNewtaskComAct = false;

  private taskServ = inject(TaskServiceComponent);
  private destroyRef = inject(DestroyRef);

  // userName = '';
  // uId!: string;

  // @Input({ required: true }) userId!: string;

  /*
  @Input({ required: true })
  set userId(id: string) {
    const uName = this.userServ.findUser(id)?.name;
    this.userName = capitalize1stLetter(uName);
    this.uId = id;
  }
  */

  ngOnInit(): void {
    console.log('Static Data from Route : ', this.message());

    const taskServSub = this.taskServ.isNewTaskCompActv$.subscribe({
      next: state => (this.isNewtaskComAct = state),
    });

    this.destroyRef.onDestroy(() => taskServSub.unsubscribe());
  }
}

export const resolveUserName: ResolveFn<string> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userServ = inject(UserServiceComponent);
  const userId = route.paramMap.get('userId');
  let userName: string;

  if (userId) {
    userName = capitalize1stLetter(userServ.findUser(userId)?.name);
  } else {
    userName = '';
  }

  return userName;
};

export const resolveTitle: ResolveFn<string> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return resolveUserName(route, state) + "'s Tasks";
};
