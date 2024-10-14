# Easy Task (Angular App with routing)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.3.
This project is the extension of [Essentials-18](https://github.com/actionanand/essentials-18)

## Cloning Guide

1.  Clone only the remote primary HEAD (default: origin/master)

```bash
git clone <url> --single-branch
```

2. Only specific branch

```bash
git clone <url> --branch <branch> --single-branch [<folder>]
```

```bash
git clone <url> --branch <branch>
```

3. Cloning repositories using degit

   - master branch is default.

```bash
npx degit github:user/repo#branch-name <folder-name>
```

4. Cloning this project with skeleton

```bash
git clone https://github.com/actionanand/easy-task-route.git --branch 1-skeleton angular-proj-name
```

```bash
npx degit github:actionanand/easy-task-route#1-skeleton angular-proj-name
```

## Automate using `Prettier`, `Es Lint` and `Husky`

1. Install the compatible node version

```bash
  nvm install v20.13.1
```

2. Install and Configure Prettier

   - Install prettier as below:

   ```bash
     yarn add prettier -D
   ```

   - Create a `.prettierrc` file and write down the format as below: - [online ref](https://prettier.io/docs/en/options.html)

   ```yml
   trailingComma: 'all'
   tabWidth: 2
   useTabs: false
   semi: true
   singleQuote: true
   bracketSpacing: true
   bracketSameLine: true
   arrowParens: 'avoid'
   printWidth: 120
   overrides:
     - files:
         - '*.js'
         - '*.jsx'
       options:
         bracketSpacing: true
         jsxSingleQuote: true
         semi: true
         singleQuote: true
         tabWidth: 2
         useTabs: false
     - files:
         - '*.ts'
       options:
         tabWidth: 2
   ```

   - Create a `.prettierignore` file and write as below(sample)

   ```gitignore
   # Ignore artifacts:
   build
   coverage
   e2e
   node_modules
   dist
   dest
   reports

   # Ignore files
   *.lock
   package-lock.json
   yarn.lock
   ```

3. Install `Es Lint`, if not installed

```bash
ng add @angular-eslint/schematics
```

if error comes, use the below command

```shell
ng add @angular-eslint/schematics@next
```

4. Configure pre-commit hooks

Pre-commit hooks are a nice way to run certain checks to ensure clean code. This can be used to format staged files if for some reason they weren’t automatically formatted during editing. [husky](https://github.com/typicode/husky) can be used to easily configure git hooks to prevent bad commits. We will use this along with [pretty-quick](https://github.com/azz/pretty-quick) to run Prettier on our changed files. Install these packages, along with [npm-run-all](https://github.com/mysticatea/npm-run-all), which will make it easier for us to run npm scripts:

```bash
yarn add husky pretty-quick npm-run-all -D
```

To configure the pre-commit hook, simply add a `precommit` npm script. We want to first run Prettier, then run TSLint on the formatted files. To make our scripts cleaner, I am using the npm-run-all package, which gives you two commands, `run-s` to run scripts in sequence, and `run-p` to run scripts in parallel:

```json
  "precommit": "run-s format:fix lint",
  "format:fix": "pretty-quick --staged",
  "format:check": "prettier --config ./.prettierrc --list-different \"src/{app,environments,assets}/**/*{.ts,.js,.json,.css,.scss}\"",
  "format:all": "prettier --config ./.prettierrc --write \"src/{app,environments,assets}/**/*{.ts,.js,.json,.css,.scss}\"",
  "lint": "ng lint",
```

5. Initialize husky

   - Run it once

   ```bash
     npm pkg set scripts.prepare="husky install"
     npm run prepare
   ```

   - Add a hook

   ```bash
     npx husky add .husky/pre-commit "yarn run precommit"
     npx husky add .husky/pre-commit "yarn test"
     git add .husky/pre-commit
   ```

   - Make a commit

   ```bash
     git commit -m "Keep calm and commit"
     # `yarn run precommit and yarn test` will run every time you commit
   ```

6. How to skip prettier format only in particular file

   1. JS

   ```js
   matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);

   // prettier-ignore
   matrix(
       1, 0, 0,
       0, 1, 0,
       0, 0, 1
     )
   ```

   2. JSX

   ```jsx
   <div>
     {/* prettier-ignore */}
     <span     ugly  format=''   />
   </div>
   ```

   3. HTML

   ```html
   <!-- prettier-ignore -->
   <div         class="x"       >hello world</div            >

   <!-- prettier-ignore-attribute -->
   <div (mousedown)="       onStart    (    )         " (mouseup)="         onEnd      (    )         "></div>

   <!-- prettier-ignore-attribute (mouseup) -->
   <div (mousedown)="onStart()" (mouseup)="         onEnd      (    )         "></div>
   ```

   4. CSS

   ```css
   /* prettier-ignore */
   .my    ugly rule
     {
   
     }
   ```

   5. Markdown

   ```md
     <!-- prettier-ignore -->

   Do not format this
   ```

   6. YAML

   ```yml
   # prettier-ignore
   key  : value
     hello: world
   ```

   7. For more, please [check](https://prettier.io/docs/en/ignore.html)

## Resources

- [GitHub Actions for Angular](https://github.com/rodrigokamada/angular-github-actions)
- [Angular 16 - milestone release](https://github.com/actionanand/ng16-signal-milestone-release)

## Wiki

1. Class-based Resolvers

```ts
@Injectable({ providedIn: 'root' })
export class UserNameResolver implements Resolve<string> {
  constructor(private usersService: UsersService) {}
  resolve(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userName = this.usersService.users.find(u => u.id === activatedRoute.paramMap.get('userId'))?.name || '';
    return userName;
  }
}
```

- [resolver with function based way](https://github.com/actionanand/easy-task-route/blob/master/src/app/pages/user-task/user-task.component.ts)

2. Class-based Guards (deprecated)

```ts
@Injectable({ providedIn: 'root' })
class CanMatchTeamSection implements CanMatch {
  constructor(private router: Router) {}
  canMatch(route: Route, segments: UrlSegment[]) {
    const shouldGetAccess = Math.random();
    if (shouldGetAccess < 0.5) {
      return true;
    }
    return new RedirectCommand(this.router.parseUrl('/unauthorized'));
  }
}
```

- [canMatch with function based way](https://github.com/actionanand/easy-task-route/blob/master/src/app/app.routes.ts)

```ts
// `canMatch` in modern way
import { Routes } from '@angular/router';

export const abcTestingRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./a/a.component').then(m => m.AComponent),
    canMatch: [() => d100() < 20],
  },
  {
    path: '',
    loadComponent: () => import('./b/b.component').then(m => m.BComponent),
    canMatch: [() => d100() < 50],
  },
  {
    path: '',
    loadComponent: () => import('./c/c.component').then(m => m.CComponent),
    canMatch: [() => d100() < 25],
  },
  {
    path: '',
    loadComponent: () => import('./d/d.component').then(m => m.DComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

const d100 = (): number => Math.floor(Math.random() * 99) + 1;
```

3. Angular: Providers inside routes array

```ts
// my-service.service.ts
import { Injectable } from '@angular/core';

@Injectable() // `providedIn: 'root'` is not there
export class MyService {
  someData: string = 'Data from MyService';
}
```

```ts
// app.routes.ts
import { Routes } from '@angular/router';
import { MyComponent } from './my-component.component';
import { Home } from './home.component';
import { MyService } from './my-service.service';

// const routes: Routes = [
//   {
//     path: '',
//     component: HomeComponent,
//   },
//   {
//     path: 'my-route',
//     component: MyComponent,
//   }
// ];

const routes: Routes = [
  {
    path: '',
    providers: [MyService],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'my-route',
        component: MyComponent,
      },
    ],
  },
];
```

- [Why You Should Use canMatch in Your Routes](https://medium.com/ngconf/why-you-should-use-canmatch-in-your-routes-97fec434823d)
- [Router Guards In Angular (canActivate, canActivateChild, canDeactivate, canLoad, resolve)](https://bittukumar-web.medium.com/router-guards-in-angular-canactivate-canactivatechild-candeactivate-canload-resolve-8cc2519e70c)
- [The difference between the canActivate and canActivateChild guards](https://timdeschryver.dev/blog/the-difference-between-the-canactivate-and-canactivatechild-guards#)
- [Lazy loading services in Angular. What?! Yes, we can.](https://push-based.io/article/lazy-loading-services-in-angular-what-yes-we-can)
- [Angular: route providers explained](https://medium.com/@IgorPak-dev/angular-route-providers-explained-a652089cfda1)
