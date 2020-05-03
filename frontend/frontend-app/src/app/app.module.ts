import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { AppMaterialModule } from './modules/app-material/app-material.module';
import { TokenInterceptor } from './services/auth/token.interceptor';

import { AppComponent } from './app.component';
import { CallbackComponent } from './components/callback/callback.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { TripCreateComponent } from './components/trip-create/trip-create.component';
import { SanitizeHtmlPipe } from  './sanitize-html.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TripDetailComponent,
    CallbackComponent,
    TripCreateComponent,
    SanitizeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    SanitizeHtmlPipe,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
