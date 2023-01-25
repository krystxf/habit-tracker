import { Component, HostListener, Input } from '@angular/core'
import { HABITS_KEY, TRACKING_DATA_KEY } from 'src/constants/localstorage'
import { IHabit } from 'src/types/habit'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @HostListener('window:storage', ['$event'])
  onStorageChange(/* event: StorageEvent */) {
    this.refreshHabits()
    this.refreshData()
  }
  @Input()
  public showControls: boolean = false

  today = new Date()
  viewer = new Date(this.today.getFullYear(), this.today.getMonth()) // day defaults to 1
  isNow = false // is viewer month and year same as current date
  days: Array<Array<boolean>> = []
  habits: Array<IHabit> = []

  constructor() {
    this.refreshHabits()
    this.refreshData()
  }

  refreshHabits() {
    this.habits = JSON.parse(localStorage.getItem(HABITS_KEY) || '[]')

    console.log(this.habits)
  }

  refreshData() {
    this.isNow =
      this.viewer.getMonth() === this.today.getMonth() &&
      this.viewer.getFullYear() === this.today.getFullYear()

    const numOfDaysInMonth = new Date(
      this.viewer.getFullYear(),
      this.viewer.getMonth() + 1, // month needs to be +1 because day is 0 which is the last day of the previous month
      0
    ).getDate()

    this.days = new Array(numOfDaysInMonth).fill(
      new Array(this.habits.length).fill(false)
    )
  }

  toggleCheck(day: number, habitId: string) {
    const localStorageData = JSON.parse(
      localStorage.getItem(TRACKING_DATA_KEY) || '{}'
    )

    const selectedYear = this.viewer.getFullYear()
    const selectedMonth = this.viewer.getMonth()

    if (!localStorageData[selectedYear]) localStorageData[selectedYear] = {}

    if (!localStorageData[selectedYear][selectedMonth])
      localStorageData[selectedYear][selectedMonth] = {}

    const habitIndex = localStorageData[selectedYear][
      selectedMonth
    ].habits.findIndex(({ id }: any) => id === habitId)

    if (habitIndex === -1) return // habit not found
    console.log(localStorageData)

    const done = new Set(
      localStorageData[selectedYear][selectedMonth].habits[habitIndex].done
    )

    if (done.has(day)) {
      done.delete(day)
    } else {
      done.add(day)
    }

    localStorageData[selectedYear][selectedMonth].habits[habitIndex].done =
      Array.from(done)

    localStorage.setItem(TRACKING_DATA_KEY, JSON.stringify(localStorageData))
  }

  prevMonth() {
    this.viewer.setMonth(this.viewer.getMonth() - 1)

    this.refreshData()
  }

  nextMonth() {
    this.viewer.setMonth(this.viewer.getMonth() + 1)

    this.refreshData()
  }
}
