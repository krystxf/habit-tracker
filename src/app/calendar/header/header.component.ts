import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-calendar-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input()
  public viewer!: Date

  @Output()
  public currentMonth = new EventEmitter()

  handleCurrentMonth() {
    this.currentMonth.emit()
  }

  @Output()
  public nextMonth = new EventEmitter()

  handleNextMonth() {
    this.nextMonth.emit()
  }

  @Output()
  public prevMonth = new EventEmitter()

  handlePrevMonth() {
    this.prevMonth.emit()
  }
}
