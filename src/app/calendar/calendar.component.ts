import { Component, HostListener, Input } from '@angular/core'
import { HABITS_KEY, TRACKING_DATA_KEY } from 'src/constants/localstorage'
import getNumOfDaysInMonth from 'src/functions/getNumOfDaysInMonth'
import { parseHabits } from './functions/habitsValidation'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  Arr = Array
  @HostListener('window:storage', ['$event'])
  onStorageChange() {
    this.refreshData()
    this.habits = this.readHabits()
  }
  @Input()
  public showControls: boolean = false

  today = new Date()
  viewer = new Date(this.today.getFullYear(), this.today.getMonth()) // day defaults to 1
  isNow = false // is viewer month and year same as current date
  days: { habit: string; done: number[] }[] = []
  habits: any[] = []
  numOfDaysInMonth = 0

  constructor() {
    this.habits = this.readHabits()

    // this.refreshHabits()
    this.refreshData()
  }

  refreshHabits() {
    this.habits = JSON.parse(localStorage.getItem(HABITS_KEY) || '[]')
  }

  readHabits() {
    const raw = localStorage.getItem(TRACKING_DATA_KEY)
    if (!raw) {
      console.error(`localStorage doesn't contain "${TRACKING_DATA_KEY}"`)
      return []
    }

    const parsed = JSON.parse(raw)

    const selectedYear = this.viewer.getFullYear()
    const selectedMonth = this.viewer.getMonth()

    if (!parsed[selectedYear]) {
      console.error(`"${TRACKING_DATA_KEY}" doesn't have "${selectedYear}" key`)
      return []
    }
    if (!parsed[selectedYear][selectedMonth]) {
      console.error(
        `"${TRACKING_DATA_KEY}" doesn't have "${selectedYear}.${selectedMonth}" key`
      )
      return []
    }

    const habits = parseHabits(parsed[selectedYear][selectedMonth].habits)

    return habits
  }

  refreshData() {
    this.isNow =
      this.viewer.getMonth() === this.today.getMonth() &&
      this.viewer.getFullYear() === this.today.getFullYear()

    this.numOfDaysInMonth = getNumOfDaysInMonth(
      this.viewer.getFullYear(),
      this.viewer.getMonth()
    )

    this.days = this.habits.map((habit) => ({ habit: habit.id, done: [] }))
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

  prevMonth(): void {
    this.viewer.setMonth(this.viewer.getMonth() - 1)

    this.refreshData()
    this.habits = this.readHabits()
  }

  nextMonth(): void {
    this.viewer.setMonth(this.viewer.getMonth() + 1)

    this.refreshData()
    this.habits = this.readHabits()
  }

  currentMonth(): void {
    this.viewer = new Date()

    this.refreshData()
    this.habits = this.readHabits()
  }

  removeHabit(id: string): void {
    const raw = localStorage.getItem(TRACKING_DATA_KEY)

    if (!raw) {
      console.error(`localStorage doesn't contain "${TRACKING_DATA_KEY}"`)
      return
    }

    const parsed = JSON.parse(raw)

    const selectedYear = this.viewer.getFullYear()
    const selectedMonth = this.viewer.getMonth()

    if (
      typeof parsed !== 'object' ||
      parsed[selectedYear] === undefined ||
      parsed[selectedYear][selectedMonth] === undefined
    ) {
      console.error(`"${TRACKING_DATA_KEY}" doesn't have "${selectedYear}" key`)
      return
    }

    const habitIndex = parsed[selectedYear][selectedMonth].habits.findIndex(
      (habit: any) => habit.id === id
    )

    parsed[selectedYear][selectedMonth].habits.splice(habitIndex, 1)

    localStorage.setItem(TRACKING_DATA_KEY, JSON.stringify(parsed))
    this.refreshData()
    this.habits = this.readHabits()
  }
}
