import { daysType } from 'src/types/habit'

const isValidDoneElement = (element: any): boolean => {
  // element a numbers between 1 and 31
  return typeof element === 'number' && element > 0 && element < 31
}

export const parseHabit = (habit: any): IHabit | null => {
  // if habit can't be parsed, return undefined, otherwise replace invalid data with valid data

  const parsed = {
    id: habit.id,
    title: habit.title,
    days: habit.days,
    done: habit.done,
  }

  // habit must be an object
  if (typeof habit !== 'object') {
    console.error('parseHabit: habit is not an object')
    return null
  }

  // validate habit.id
  if (typeof parsed.id !== 'string') {
    console.error('parseHabit: habit.id is not a string')
    parsed.id = crypto.randomUUID()
  }

  // validate habit.title
  if (typeof parsed.title !== 'string') {
    console.error('parseHabit: habit.title is not a string')
    parsed.title = 'New Habit'
  }

  // validate habit.days
  // habit.days must be an array of 7 booleans
  const { days } = parsed
  if (!Array.isArray(days) || days.length !== 7) {
    console.error('parseHabit: habit.days is not an array')
    parsed.days = [true, true, true, true, true, true, true]
  }

  parsed.days = days.map((day: any) => (typeof day === 'boolean' ? day : true))

  // validate habit.done
  if (!Array.isArray(parsed.done)) {
    console.error('parseHabit: habit.done is not an array')
    parsed.done = []
  }
  parsed.done.filter(isValidDoneElement)

  return parsed
}

export const parseHabits = (habits: any): IHabit[] => {
  if (!Array.isArray(habits)) {
    console.error('parseHabits: habits is not an array')
    return []
  }

  // @ts-ignore just wtf this literally cannot be null
  return habits.map(parseHabit).filter((habit) => habit !== null)
}

interface IHabit {
  title: string
  days: daysType
  id: string
  done: number[]
}
