import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { CalendarComponent } from './calendar.component'

describe('CalendarComponent', () => {
  let component: CalendarComponent
  let fixture: ComponentFixture<CalendarComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent)
    component = fixture.componentInstance
  })

  it('viewer should be Date', () => {
    expect(typeof component.viewer).toEqual('object')
    expect(component.viewer instanceof Date).toBeTruthy()
  })

  it('today should be Date', () => {
    expect(typeof component.today).toEqual('object')
    expect(component.today instanceof Date).toBeTruthy()
  })

  it("viewer should be today's month and year", () => {
    expect(component.viewer.getMonth()).toEqual(new Date().getMonth())
    expect(component.viewer.getFullYear()).toEqual(new Date().getFullYear())
  })

  it('after calling prevMonth(), viewer should be previous month', () => {
    component.prevMonth()

    let expectedMonth = new Date()
    expectedMonth.setMonth(new Date().getMonth() - 1)

    expect(component.viewer.getMonth()).toEqual(expectedMonth.getMonth())
  })

  it('after calling prevMonth() 12x, viewer should be previous year', () => {
    for (let i = 0; i < 12; i++) {
      component.prevMonth()
    }

    expect(component.viewer.getFullYear()).toEqual(new Date().getFullYear() - 1)
  })

  it('after calling nextMonth(), viewer should be next month', () => {
    component.nextMonth()

    let expectedMonth = new Date()
    expectedMonth.setMonth(new Date().getMonth() + 1)

    expect(component.viewer.getMonth()).toEqual(expectedMonth.getMonth())
  })

  it('after calling nextMonth() 12x, viewer should be next year', () => {
    for (let i = 0; i < 12; i++) {
      component.nextMonth()
    }

    expect(component.viewer.getFullYear()).toEqual(new Date().getFullYear() + 1)
  })
})
