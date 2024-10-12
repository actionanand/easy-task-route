import { Component, inject, input, computed, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
// import { Input } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { DestroyRef } from '@angular/core';

import { TaskComponent } from '../../components/task/task.component';
import { TaskServiceComponent } from '../../services/task.service';

import { capitalize1stLetter } from '../../shared/functions/capitalize1stLetter';
import { UserServiceComponent } from '../../services/user.service';

@Component({
  selector: 'app-user-task',
  standalone: true,
  imports: [RouterLink, RouterOutlet, TaskComponent],
  templateUrl: './user-task.component.html',
  styleUrl: './user-task.component.scss',
})
export class UserTaskComponent implements OnInit {
  private userServ = inject(UserServiceComponent);
  userId = input.required<string>();

  // userName = '';
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
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

  constructor(private taskServ: TaskServiceComponent) {}

  name = computed(() => {
    const uName = this.userServ.findUser(this.userId())?.name;
    return capitalize1stLetter(uName);
  });

  ngOnInit(): void {
    /*
    const actvRouteSub = this.activatedRoute.paramMap
      .subscribe({
        next: paramMap => {
          const idFromUrl = paramMap.get('userId');
          if (idFromUrl) {
            this.uId = idFromUrl;
            const uName = this.userServ.findUser(this.uId)?.name;
            this.userName = capitalize1stLetter(uName);
          }
        }
      });

    this.destroyRef.onDestroy(() => actvRouteSub.unsubscribe());
    */

    console.log('on init life cycle hook');
  }
}
