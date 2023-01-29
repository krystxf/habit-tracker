const getNumOfDaysInMonth = (month: number, year: number): number => {
  const res =
    // get the last day of the month
    new Date(
      year,
      month + 1, // month needs to be +1 because day is 0 which is the last day of the previous month
      0
    )

  return res.getDate() // return the day
}

export default getNumOfDaysInMonth
