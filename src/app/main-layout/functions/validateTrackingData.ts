import { TRACKING_DATA_KEY, HABITS_KEY } from 'src/constants/localstorage'
import { IHabit } from 'src/types/habit'

const validateTrackingdata = () => {
  // @ts-ignore
  const habits: IHabit[] = localStorage.getItem(HABITS_KEY) // add validation for habits

  const DEFAULT = {
    [new Date().getFullYear()]: {
      [new Date().getMonth()]: {
        habits: habits.map((habit) => ({ ...habit, done: [] })),
      },
    },
  }

  const locStorData = localStorage.getItem(TRACKING_DATA_KEY)

  // if there is no trackingData in local storage, create an empty object with current month
  if (!locStorData) {
    localStorage.setItem(TRACKING_DATA_KEY, JSON.stringify(DEFAULT))
    return
  }
}

export default validateTrackingdata
