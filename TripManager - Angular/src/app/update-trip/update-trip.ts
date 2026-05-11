import { Component,inject,OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Trip } from '../models/trip.model';

@Component({
  selector: 'app-update-trip',
  imports: [ReactiveFormsModule],
  templateUrl: './update-trip.html',
  styleUrl: './update-trip.css',
})
export class UpdateTrip implements OnInit {

  private apiService = inject(ApiService);
  private router = inject(Router)
  private route = inject(ActivatedRoute);

  tripId!: string;
  trip!: Trip;
  form = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  destination: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  startDate: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
  endDate: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
  price: new FormControl(0, [Validators.required, Validators.min(0)]),
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

 ngOnInit() {
  this.tripId = this.route.snapshot.paramMap.get('id') || '';
  this.apiService.getTripById(this.tripId).subscribe(trip => {
    this.trip = trip;
    this.form.patchValue({
      name: trip.name,
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      price: trip.price,
      description: trip.description,
      image: trip.image
    });
  });
 }

 onUpdate() {
  console.log('Update button clicked');
  console.log('Form valid:', this.form.valid);
  console.log('Form value:', this.form.value);
  console.log('Trip ID:', this.tripId);
  
  if (this.form.valid) {
    const updatedTrip: Trip = {
      id: this.tripId,
      name: this.form.value.name || '',
      destination: this.form.value.destination || '',
      startDate: this.form.value.startDate || '',
      endDate: this.form.value.endDate || '',
      price: Number(this.form.value.price) || 0,
      description: this.form.value.description || '',
      image: this.form.value.image || ''
    };
    
    console.log('Updating trip:', updatedTrip);
    
    this.apiService.updateTrip(this.tripId, updatedTrip).subscribe({
      next: (response) => {
        console.log('Trip updated successfully:', response);
        alert('Trip updated successfully!');
        this.router.navigate(['/trips']);
      },
      error: (err) => {
        console.error('Error updating trip:', err);
      }
    });
  } else {
    console.log('Form is invalid');
    this.form.markAllAsTouched();
  }
}
}
