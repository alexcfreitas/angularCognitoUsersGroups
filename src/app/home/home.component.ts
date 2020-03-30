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
  authenticatedUser;
  user;

  constructor(private http: Http, private auth: AuthorizationService) { }

  ngOnInit() {

    this.auth.getAuthenticatedUser().then(user => {
      if (user == null) {
        return;
      }
      this.authenticatedUser = user;
      this.user = this.authenticatedUser;
      this.bAuthenticated = true;
      console.log('USER __ ',this.user);
      return this.user;
    }).catch(err => console.log(err));

  }

}
