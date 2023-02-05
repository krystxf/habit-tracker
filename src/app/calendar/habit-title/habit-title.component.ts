import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-calendar-habit-title',
  templateUrl: './habit-title.component.html',
  styleUrls: ['./habit-title.component.scss'],
})
export class HabitTitleComponent {
  @Input()
  public habit!: any

  @Output()
  public removeHabit = new EventEmitter()

  handleRemoveHabit() {
    this.removeHabit.emit()
  }
}
