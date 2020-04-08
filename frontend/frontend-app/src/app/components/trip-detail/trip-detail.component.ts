import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Trip } from '../../trip';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.sass']
})
export class TripDetailComponent implements OnInit {
  trip: Observable<Trip>

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {      
      this.trip = this.apiService.getTrip(
        params.get('tripSlug')
      )
    })
    
  }

}
