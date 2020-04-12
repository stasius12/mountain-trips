import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.sass']
})
export class CallbackComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.handleLoginCallback();
  }

}
