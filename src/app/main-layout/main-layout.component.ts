import { Component, HostListener } from '@angular/core'

@Component({
  selector: 'app-main-layout',
  template: `
    <app-navbar></app-navbar>

    <app-habits-management-modal
      [isOpen]="isHabitsMgmtModalOpen"
      (handleClose)="isHabitsMgmtModalOpen = false"
    ></app-habits-management-modal>

    <main>
      <div class="top">
        <h1 style="display: flex; align-items: center; gap: 8px;">
          <ion-icon name="calendar-outline"></ion-icon>
          Calendar
        </h1>
        <button type="button" (click)="handleManageHabits()">
          Manage habits
        </button>
      </div>

      <app-calendar [showControls]="true"></app-calendar>
    </main>
  `,
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  @HostListener('window:storage', ['$event'])
  onStorageChange() {
    // validateCurrentHabits()
    // validateTrackingdata()
  }
  isHabitsMgmtModalOpen = false

  handleManageHabits = () => {
    this.isHabitsMgmtModalOpen = !this.isHabitsMgmtModalOpen
  }

  constructor() {
    // validateCurrentHabits()
    // validateTrackingdata()
  }
}
