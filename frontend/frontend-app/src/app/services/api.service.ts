import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Trip } from '../trip';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = 'http://localhost/'

  constructor(
    private http: HttpClient
  ) { }

  public getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.API_URL}trips/`);
  }

  public getTrip(slug: string) {
    return this.http.get<Trip>(`${this.API_URL}trips/${slug}/`);
  }
}
