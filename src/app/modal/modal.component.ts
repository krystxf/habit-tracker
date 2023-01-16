import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input()
  public isOpen: boolean = false;
  @Input() public title: string = '';
  @Output() public onClose = new EventEmitter();

  handleClose() {
    this.onClose.emit();
  }
}
