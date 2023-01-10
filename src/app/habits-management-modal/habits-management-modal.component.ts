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
          <table>
            <thead>
              <tr>
                <th>Habit</th>
                <th *ngFor="let day of days">{{ day }}</th>
              </tr>
            </thead>

            <tbody>
              <tr *ngFor="let habit of habits">
                <td class="habit">
                  {{ habit }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="trash-icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </td>
                <td *ngFor="let day of days">
                  <input type="checkbox" />
                </td>
              </tr>
              <tr class="new" (click)="handleAddHabit()">
                <td>
                  <span class="icon">+</span>
                  Add habit
                </td>
              </tr>
            </tbody>
          </table>
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
  days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

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
