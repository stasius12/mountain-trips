import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../services/auth/auth.guard';

import { TripListComponent } from '../../components/trip-list/trip-list.component';
import { TripDetailComponent } from '../../components/trip-detail/trip-detail.component';
import { CallbackComponent } from '../../components/callback/callback.component';


const routes: Routes = [
  {
    path: 'trips',
    component: TripListComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'trips/:tripSlug',
    component: TripDetailComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'callback',
    component: CallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
