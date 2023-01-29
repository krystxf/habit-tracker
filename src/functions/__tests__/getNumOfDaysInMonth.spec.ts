import getNumOfDaysInMonth from '../getNumOfDaysInMonth'

describe('getNumOfDaysInMonth', () => {
  it('should return 31 for January 2022', () => {
    const result = getNumOfDaysInMonth(0, 2022)
    expect(result).toBe(31)
  })

  it('should return 29 for February 2024 (leap year)', () => {
    const result = getNumOfDaysInMonth(1, 2024)
    expect(result).toBe(29)
  })

  it('should return 28 for February 2022', () => {
    const result = getNumOfDaysInMonth(1, 2022)
    expect(result).toBe(28)
  })

  it('should return 30 for April 2022', () => {
    const result = getNumOfDaysInMonth(3, 2022)
    expect(result).toBe(30)
  })
})
