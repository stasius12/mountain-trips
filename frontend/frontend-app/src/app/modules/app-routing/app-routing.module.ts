import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripListComponent } from '../../components/trip-list/trip-list.component';
import { TripDetailComponent } from '../../components/trip-detail/trip-detail.component';


const routes: Routes = [
  { path: '', component: TripListComponent },
  { path: 'trips/:tripSlug', component: TripDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
