import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { AppMaterialModule } from './modules/app-material/app-material.module';
import { AppComponent } from './app.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TripDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
