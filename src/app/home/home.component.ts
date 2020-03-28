import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from "../shared/authorization.service";
import { Http, Headers } from "@angular/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bAuthenticated = false;
  user;

  constructor(private http: Http, private auth: AuthorizationService) { }

  ngOnInit() {
    var authenticatedUser = this.auth.getAuthenticatedUser();
    if (authenticatedUser == null) {
      return;
    }
    this.user = JSON.stringify(authenticatedUser)
    // console.log(this.user);
    this.bAuthenticated = true;

  }

}
