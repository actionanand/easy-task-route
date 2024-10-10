import { Injectable } from '@angular/core';

import { type User } from '../model/user-data.model';
import { DUMMY_USERS } from '../shared/local-data/dummy-users';

@Injectable({
  providedIn: 'root',
})
export class UserServiceComponent {
  private users: User[] = DUMMY_USERS;

  getAllUsers() {
    return this.users.slice();
  }

  findUser(id = 'UNKNOWN') {
    return this.users.find(user => user.id === id);
  }
}
