import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../services/auth/auth.guard';

import { CallbackComponent } from '../../components/callback/callback.component';
import { TripListComponent } from '../../components/trip-list/trip-list.component';
import { TripDetailComponent } from '../../components/trip-detail/trip-detail.component';
import { TripCreateComponent } from '../../components/trip-create/trip-create.component';


const routes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 't',
    component: TripListComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: ':tripSlug',
    component: TripDetailComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 't/create',
    component: TripCreateComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true }
  )],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
