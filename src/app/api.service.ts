import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Trip } from "./models/trip.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl = "http://localhost:3000"; 

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiUrl}/trips`);
  }

  getTripById(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/trips/${id}`);
  }
  
  getNextTripId(): Observable<string> {
    return this.getTrips().pipe(
      map(trips => {
        if (trips.length === 0) return "1";
        const maxId = Math.max(...trips.map(trip => Number(trip.id)));
        return String(maxId + 1);
      })
    );
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiUrl}/trips`, trip);
  }


  updateTrip(id: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiUrl}/trips/${id}`, trip);
  };

  deleteTrip(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/trips/${id}`);
  }

  getBookingByTripId(tripId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bookings?tripId=${tripId}`);
  }

  getIfCouldDeleteTrip(tripId: string): Observable<boolean> {
    return this.getBookingByTripId(tripId).pipe(
      map(bookings => bookings.length === 0)
    );
  }


}