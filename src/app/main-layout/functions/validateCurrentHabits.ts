import { HABITS_KEY } from 'src/constants/localstorage'
import { IHabit } from 'src/types/habit'

const validateCurrentHabits = () => {
  const locStorHabits = localStorage.getItem(HABITS_KEY)

  // if there is no habits in local storage, create an empty array
  if (!locStorHabits) {
    localStorage.setItem(HABITS_KEY, '[]')
    return
  }

  const parsed = JSON.parse(locStorHabits)

  // if there is a habits in local storage, but it is not an array, create an empty array
  if (!Array.isArray(parsed)) {
    localStorage.setItem(HABITS_KEY, '[]')
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
      Array.isArray(habit?.days) &&
      habit.days.length === 7 &&
      habit.days.every((day: any) => typeof day === 'boolean')

    return {
      id: isIdValid ? habit.id : crypto.randomUUID(),
      title: typeof habit.title === 'string' ? habit.title : 'New habit',
      days: isDaysArrayValid ? habit.days : new Array(7).fill(true),
    }
  })

  localStorage.setItem(HABITS_KEY, JSON.stringify(valid))
}

export default validateCurrentHabits
