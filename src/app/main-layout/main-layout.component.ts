import { Component, HostListener } from '@angular/core'
import validateCurrentHabits from './functions/validateCurrentHabits'

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
        <h1>Calendar</h1>
        <button type="button" (click)="handleManageHabits()">
          Manage habits
        </button>
      </div>

      <app-calendar [showControls]="false"></app-calendar>
    </main>
  `,
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  @HostListener('window:storage', ['$event'])
  onStorageChange() {
    validateCurrentHabits()
  }
  isHabitsMgmtModalOpen = false

  handleManageHabits = () => {
    this.isHabitsMgmtModalOpen = !this.isHabitsMgmtModalOpen
  }

  ngOnInit() {
    validateCurrentHabits()
  }
}
