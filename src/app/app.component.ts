import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/user/user.component';
import { TasksComponent } from './components/tasks/tasks.component';
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
  userServ = inject(UserServiceComponent);

  users: User[] = [];

  ngOnInit(): void {
    this.users = this.userServ.getAllUsers();
  }

  fallbackStatement = 'Please select a user!';

  selectedUserId?: string;

  get selectedUser() {
    return this.userServ.findUser(this.selectedUserId);
  }

  onSelectUser(id: string) {
    this.selectedUserId = id;
  }
}
