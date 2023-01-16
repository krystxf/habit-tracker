import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <app-navbar></app-navbar>

    <app-habits-management-modal
      [isOpen]="isHabitsMgmtModalOpen"
      (onClose)="isHabitsMgmtModalOpen = false"
    ></app-habits-management-modal>

    <main>
      <button type="button" (click)="handleManageHabits()">
        Manage habits
      </button>
    </main>
  `,
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  isHabitsMgmtModalOpen = false;

  handleManageHabits = () => {
    this.isHabitsMgmtModalOpen = !this.isHabitsMgmtModalOpen;
  };
}
