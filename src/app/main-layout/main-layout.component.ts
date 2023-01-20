import { Component } from '@angular/core'
import { IHabit } from 'src/types/habit'

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
  isHabitsMgmtModalOpen = false

  handleManageHabits = () => {
    this.isHabitsMgmtModalOpen = !this.isHabitsMgmtModalOpen
  }

  validateLocalStorage() {
    const locStorHabits = localStorage.getItem('habits')

    // if there is no habits in local storage, create an empty array
    if (!locStorHabits) {
      localStorage.setItem('habits', '[]')
      return
    }

    const parsed = JSON.parse(locStorHabits)

    // if there is a habits in local storage, but it is not an array, create an empty array
    if (!Array.isArray(parsed)) {
      localStorage.setItem('habits', '[]')
      return
    }

    // if there is a habits array in local storage, validate each habit
    const valid: IHabit[] = parsed.map((habit, index) => {
      // habit id is a string and it is unique
      const isIdValid =
        typeof habit.id === 'string'
          ? !parsed.some((h, i) => i !== index && h.id === habit.id) // if there is a habit with the same id, return false
          : false

      const isDaysArrayValid =
        Array.isArray(habit.days) &&
        habit.days.length === 7 &&
        habit.days.every((day: any) => typeof day === 'boolean')

      console.log({ isIdValid })

      return {
        id: isIdValid ? habit.id : crypto.randomUUID(),
        title: typeof habit.title === 'string' ? habit.title : 'New habit',
        days: isDaysArrayValid ? habit.days : new Array(7).fill(true),
      }
    })

    localStorage.setItem('habits', JSON.stringify(valid))
  }

  ngOnInit() {
    this.validateLocalStorage()
  }
}
