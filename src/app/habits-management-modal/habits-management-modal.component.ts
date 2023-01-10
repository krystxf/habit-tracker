import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-habits-management-modal',
  template: `
    <div *ngIf="isOpen">
      <div class="modal-overlay"></div>
      <div class="modal">
        <h1>Habits management modal</h1>
      </div>
    </div>
  `,
  styleUrls: ['./habits-management-modal.component.scss'],
})
export class HabitsManagementModalComponent {
  @Input()
  isOpen: boolean = false;
}
