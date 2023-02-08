import { Component, HostListener } from '@angular/core'

@Component({
  selector: 'app-main-layout',
  template: `
    <app-navbar></app-navbar>

    <main>
      <div class="top">
        <h1 style="display: flex; align-items: center; gap: 8px;">
          <ion-icon name="calendar-outline"></ion-icon>
          Calendar
        </h1>
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

  constructor() {
    // validateCurrentHabits()
    // validateTrackingdata()
  }
}
