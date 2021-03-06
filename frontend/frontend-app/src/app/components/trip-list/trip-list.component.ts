import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../services/api/api.service';
import { Trip } from '../../trip';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.sass']
})
export class TripListComponent implements OnInit {
  trips$: Observable<Trip[]>

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getTrips();
  }

  public getTrips() {
    this.trips$ = this.apiService.getTrips()
  }

  public deleteTrip(tripSlug) {
    this.apiService.deleteTrip(tripSlug)
      .subscribe(
        (response) => {
          console.log(response);
          this.getTrips();
        }
      )
  }

  getTripUrl(tripSlug) {
    return `http://localhost:4200/${tripSlug}/`;
  }
}
