import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-habits-management-modal',
  templateUrl: './habits-management-modal.component.html',
  styleUrls: ['./habits-management-modal.component.scss'],
})
export class HabitsManagementModalComponent {
  @Input()
  public isOpen: boolean = false;
  @Output() public onClose = new EventEmitter();

  days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      habits: this.fb.array([]),
    });

    const habits = JSON.parse(localStorage.getItem('habits') || '[]');

    habits.forEach((habit: any) => {
      const habitForm = this.fb.group({
        title: habit.title || 'New habit',
        days: this.fb.array(
          habit.days || [true, true, true, true, true, true, true]
        ),
      });

      this.habitForms.push(habitForm);
    });

    // on form update save data to local storage
    this.myForm.valueChanges.subscribe((value) => {
      localStorage.setItem('habits', JSON.stringify(value.habits));
    });
  }

  get habitForms() {
    return this.myForm.get('habits') as FormArray;
  }

  handleClose() {
    this.onClose.emit();
  }

  addHabit() {
    const habit = this.fb.group({
      title: [],
      days: this.fb.array([true, true, true, true, true, true, true]),
    });

    this.habitForms.push(habit);
  }

  deleteHabit(i: number) {
    this.habitForms.removeAt(i);
  }

  updateDay(i: number, ii: number) {
    this.habitForms.at(i).patchValue({
      days: this.habitForms.value[i].days.map((day: boolean, index: number) =>
        index === ii ? !day : day
      ),
    });
  }
}
