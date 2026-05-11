import { Routes } from '@angular/router';
import { AllTrips } from './all-trips/all-trips';
import { AddTrip } from './add-trip/add-trip';
import { UpdateTrip } from './update-trip/update-trip';
export const routes: Routes = [
    {path: '', component: AllTrips},
    {path: 'trips', component: AllTrips},
    {path: 'add-trip', component: AddTrip},
    {path: 'update-trip/:id', component: UpdateTrip}
];
