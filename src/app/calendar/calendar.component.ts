import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  // Create a new Date object for the current date and time
  today = new Date();

  // Use the getFullYear() and getMonth() methods to determine the year and month of the last day of the current month
  lastDayOfMonth = new Date(
    this.today.getFullYear(),
    this.today.getMonth() + 1,
    0
  );

  // Use the getDate() method to get the date of the last day of the current month (which is also the number of days in the current month)
  numberOfDaysInMonth = this.lastDayOfMonth.getDate();

  days = new Array(this.numberOfDaysInMonth).fill(new Array(7).fill(false));

  habits = JSON.parse(localStorage.getItem('habits') || '[]');
}
