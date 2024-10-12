import { Component, input, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { CardComponent } from '../../shared/ui/card/card.component';

import { capitalize1stLetter } from '../../shared/functions/capitalize1stLetter';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  @Input({ required: true }) avatar!: string;

  name = input('Test User', {
    alias: 'peyar',
    transform: (value: string) => capitalize1stLetter(value),
  });

  id = input.required<string>();
}
