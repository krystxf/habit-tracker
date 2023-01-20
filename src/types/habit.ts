export interface IHabit {
  title: string
  days: daysType
  id: string
}

export type daysType = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean
]
