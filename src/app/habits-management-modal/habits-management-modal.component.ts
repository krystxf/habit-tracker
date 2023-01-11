import { Component, Input, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-habits-management-modal',
  providers: [CookieService],
  templateUrl: './habits-management-modal.component.html',
  styleUrls: ['./habits-management-modal.component.scss'],
})
export class HabitsManagementModalComponent {
  cookieService = inject(CookieService);

  @Input()
  isOpen: boolean = false;

  days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  onClose = () => {
    this.isOpen = false;
  };

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      habits: this.fb.array([]),
    });
  }

  get habitForms() {
    return this.myForm.get('habits') as FormArray;
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
