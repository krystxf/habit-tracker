import { Component } from '@angular/core'
import { Actions } from 'kbar-angular'

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>

    <kbar [actions]="actions">
      <kbar-overlay></kbar-overlay>

      <kbar-positioner>
        <kbar-search></kbar-search>
        <kbar-results></kbar-results>
      </kbar-positioner>
    </kbar>
  `,
})
export class AppComponent {
  get actions(): Actions {
    return [
      {
        id: 'home',
        name: 'Home',
        keywords: ['home'],
        perform: () => {
          document.location.href = '/'
        },
      },
      {
        id: 'github',
        name: 'Show source code on GitHub',
        keywords: ['github', 'repo', 'repository', 'source', 'code'],
        perform: () => {
          window.open('https://github.com/krystxf/habit-tracker', '_blank')
        },
      },
    ]
  }
}
