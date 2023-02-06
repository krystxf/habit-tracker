import { Component, Input, Output, EventEmitter } from '@angular/core'
import { getParsed } from '../functions/habitsValidation'
import { TRACKING_DATA_KEY } from 'src/constants/localstorage'

@Component({
  selector: 'app-calendar-habit-title',
  templateUrl: './habit-title.component.html',
  styleUrls: ['./habit-title.component.scss'],
})
export class HabitTitleComponent {
  @Input()
  public viewer!: Date

  @Input()
  public habit!: any

  @Output()
  public removeHabit = new EventEmitter()

  editMode: boolean = false

  handleRemoveHabit() {
    this.removeHabit.emit()
  }

  onChange(e: any) {
    console.log(e.target.value)
    const parsed = getParsed()

    const selectedYear = this.viewer.getFullYear()
    const selectedMonth = this.viewer.getMonth()

    if (parsed[selectedYear] === undefined) {
      console.error(`"${TRACKING_DATA_KEY}" doesn't have "${selectedYear}" key`)
      parsed[selectedYear] = {}
    }

    if (parsed[selectedYear][selectedMonth] === undefined) {
      console.error(
        `"${TRACKING_DATA_KEY}" doesn't have "${selectedYear}.${selectedMonth}" key`
      )
      parsed[selectedYear][selectedMonth] = {
        habits: [],
      }
    }

    const habitIndex = parsed[selectedYear][selectedMonth].habits.findIndex(
      (x: any) => x.id === this.habit.id
    )

    if (habitIndex === -1) {
      console.error(
        `"${TRACKING_DATA_KEY}" doesn't have habit with id "${this.habit.id}" in "${selectedYear}.${selectedMonth}"`
      )
      return
    }

    parsed[selectedYear][selectedMonth].habits[habitIndex].title =
      e.target.value

    localStorage.setItem(TRACKING_DATA_KEY, JSON.stringify(parsed))
  }
}
