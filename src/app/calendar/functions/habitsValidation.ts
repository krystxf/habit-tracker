const isValidDoneElement = (element: any): boolean => {
  // element a numbers between 1 and 31
  return typeof element === 'number' && element > 0 && element < 31
}

const isValidDays = (days: any): boolean => {
  return (
    Array.isArray(days) &&
    days.length === 7 &&
    days.every((day) => typeof day === 'boolean')
  )
}

export const isValidHabit = (habit: any): boolean => {
  if (typeof habit !== 'object') return false

  // validate habit.id
  if (typeof habit.id !== 'string') return false

  // validate habit.title
  if (typeof habit.title !== 'string') return false

  // validate habit.days
  // habit.days must be an array of 7 booleans
  const { days } = habit
  if (!isValidDays(days)) return false

  // validate habit.done
  const { done } = habit
  if (!Array.isArray(done) || done.some((e) => !isValidDoneElement(e)))
    return false

  return true
}

export const isValidHabits = (habits: any): boolean => {
  if (!Array.isArray(habits)) return false

  return habits.every(isValidHabit)
}

export const parseHabit = (habit: any) => {
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
    return undefined
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

export const parseHabits = (habits: any) => {
  if (!Array.isArray(habits)) {
    console.error('parseHabits: habits is not an array')
    return []
  }

  return habits.map(parseHabit).filter((habit) => habit !== undefined)
}
