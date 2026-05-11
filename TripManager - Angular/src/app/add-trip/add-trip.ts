import { Component, inject } from '@angular/core';
import {ReactiveFormsModule ,FormControl,FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Trip } from '../models/trip.model';

@Component({
  selector: 'app-add-trip',
  imports: [ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css',
})
export class AddTrip {

  private apiService = inject(ApiService);
  private router = inject(Router);


  form = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  destination: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  startDate: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
  endDate: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
  price: new FormControl('', [Validators.required, Validators.min(0)]),
  description: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]),
  image: new FormControl('', Validators.required),
 }, { validators: this.dateValidator });

 dateValidator(control: AbstractControl): ValidationErrors | null {
  const startDate = control.get('startDate')?.value;
  const endDate = control.get('endDate')?.value;

  if (!startDate || !endDate) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (start < today) {
    return { startDateInPast: true };
  }

  if (end < today) {
    return { endDateInPast: true };
  }

  if (end < start) {
    return { endDateBeforeStart: true };
  }

  if (end.getTime() === start.getTime()) {
    return { sameDate: true };
  }

  return null;
 }

 onSubmit() {
  console.log('Form submitted');
  console.log('Form valid:', this.form.valid);
  console.log('Form errors:', this.form.errors);
  console.log('Form values:', this.form.value);
  
  if (this.form.valid) {
    this.apiService.getNextTripId().subscribe({
      next: (nextId) => {
        const trip: Trip = {
          id: nextId,
          name: this.form.value.name || '',
          destination: this.form.value.destination || '',
          startDate: this.form.value.startDate || '',
          endDate: this.form.value.endDate || '',
          price: Number(this.form.value.price) || 0,
          description: this.form.value.description || '',
          image: this.form.value.image || ''
        };
        
        console.log('Sending trip:', trip);
        
        this.apiService.addTrip(trip).subscribe({
          next: (response) => {
            console.log('Trip added successfully:', response);
            this.router.navigate(['/trips']);
          },
          error: (err) => {
            console.error('Error adding trip:', err);
          }
        });
      }
    });
  } else {
    console.log('Form is invalid');
    this.form.markAllAsTouched();
  }
 }
}
