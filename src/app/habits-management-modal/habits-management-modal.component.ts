import { Component, Input, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-habits-management-modal',
  providers: [CookieService],
  template: `
    <div *ngIf="isOpen">
      <div class="modal-overlay" (click)="onClose()"></div>
      <div class="modal">
        <button type="button" class="close" (click)="onClose()">
          <span class="icon">x</span>
        </button>

        <h1 class="title">Manage habits</h1>

        <section>
          <ul>
            <li *ngFor="let habit of habits">
              {{ habit }}
            </li>
          </ul>
          <button (click)="handleAddHabit()">
            <span class="icon">+</span>
            Add habit
          </button>
        </section>
      </div>
    </div>
  `,
  styleUrls: ['./habits-management-modal.component.scss'],
})
export class HabitsManagementModalComponent {
  cookieService = inject(CookieService);

  @Input()
  isOpen: boolean = false;

  habits: string[] = [];

  // habits = ['8hrs of sleep', 'Meditation', 'Running', 'Reading'];

  onClose = () => {
    this.isOpen = false;
  };

  handleAddHabit = () => {
    this.habits.push('New habit');
    this.cookieService.set('habits', JSON.stringify(this.habits));
  };

  getHabits = (): string[] => {
    return JSON.parse(this.cookieService.get('habits') || '[]') || [];
  };

  constructor() {
    const tmpHabits = this.getHabits();

    if (tmpHabits.length > 0) {
      this.habits = tmpHabits;
    } else {
      this.habits = ['8hrs of sleep', 'Meditation', 'Running', 'Reading'];
    }
  }
}
