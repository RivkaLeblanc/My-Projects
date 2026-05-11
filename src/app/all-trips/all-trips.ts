import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api.service';
import { RouterLink } from '@angular/router';
import { Trip } from '../models/trip.model';

@Component({
  selector: 'app-all-trips',
  imports: [RouterLink],
  templateUrl: './all-trips.html',
  styleUrl: './all-trips.css',
})
export class AllTrips implements OnInit {
  apiService = inject(ApiService);
  cdr = inject(ChangeDetectorRef);
  trips: Trip[] = [];

  ngOnInit() {
    this.apiService.getTrips().subscribe({
      next: (data) => {
        this.trips = data;
        console.log('Trips loaded:', this.trips);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading trips:', err);
      }
    });
  }

  onDelete(tripId: string) {
    this.apiService.getIfCouldDeleteTrip(tripId).subscribe(canDelete => {
      if (!canDelete) {
        alert('Cannot delete trip with existing bookings!');
        return;
      }
      if (confirm('Are you sure you want to delete this trip?')) {
        this.apiService.deleteTrip(tripId).subscribe({
          next: () => {
            this.trips = this.trips.filter(trip => trip.id !== tripId);
            this.cdr.detectChanges();
            alert('Trip deleted successfully!');
          },
          error: (err) => {
            console.error('Error deleting trip:', err);
            alert('Failed to delete trip!');
          }
        });
      }
    });
  }
}
