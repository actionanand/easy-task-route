import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';

import { filter } from 'rxjs';

import { HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/user/user.component';
import { TasksComponent } from './pages/user-task/tasks/tasks.component';
import { UserServiceComponent } from './services/user.service';
import { type User } from './model/user-data.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, UserComponent, NgFor, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private userServ = inject(UserServiceComponent);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  users: User[] = [];

  ngOnInit(): void {
    this.users = this.userServ.getAllUsers();

    const navRouteSub = this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe({
      next: filteredEvent => console.log('Current Route: ', filteredEvent),
    });

    this.destroyRef.onDestroy(() => navRouteSub.unsubscribe());
  }
}
