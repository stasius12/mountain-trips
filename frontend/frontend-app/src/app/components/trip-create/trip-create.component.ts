import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { FormBuilder, Validators, ValidatorFn, FormGroup, FormArray } from '@angular/forms';


@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.sass']
})
export class TripCreateComponent implements OnInit {
  createTripForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.maxLength(255)]],
    slug: [null, [Validators.required, Validators.maxLength(50)]],
    date_from: null,
    date_to: null,
    description: '',
  }, {
    validator: Validators.compose([
      this.dateValidator('date_from', 'date_to')
    ])
  });

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.apiService.postTrip(this.createTripForm.value)
      .subscribe(
        (response) => {
          window.location.assign('/t');
        }
      )
  }

  dateValidator(
    dateFromCtrlName: string,
    dateToCtrlName: string
  ): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      const dateFrom = group.get(dateFromCtrlName);
      const dateTo = group.get(dateToCtrlName);
  
      if (new Date(dateFrom.value) <= new Date(dateTo.value)) { return; }      
      group.controls[dateToCtrlName].setErrors({datesInvalid: true});
      return { datesInvalid: true };
    };
  }

}
