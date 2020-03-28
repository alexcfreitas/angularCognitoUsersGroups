import { Component, OnInit } from '@angular/core';
import { AuthorizationService} from "../shared/authorization.service";
import {Http, Headers} from "@angular/http";

export class PersonWithCars {
  constructor(public name: string, public age: number) { }
}

@Component({
  selector: 'app-restapi',
  templateUrl: './restapi.component.html',
  styleUrls: ['./restapi.component.css']
})
export class RestApiComponent implements OnInit {

  _data : any;

  constructor(private http: Http, private auth: AuthorizationService) { }

  ngOnInit() {
    var authenticatedUser = this.auth.getAuthenticatedUser();
    if (authenticatedUser == null) {
      return;
    }

    this.auth.getAuthenticatedUser().then(session => {
      let token = session.getIdToken().getJwtToken();
      console.log('TESTE AUTHORIZATION -> ',`Bearer ${token}`);
      var that = this;
      const headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      // headers.append('Accept', 'application/json');

      // headers.append('Access-Control-Allow-Origin', 'https://3xh1ivz0bj.execute-api.us-east-1.amazonaws.com');
      // headers.append('Access-Control-Allow-Credentials', 'true');

      // headers.append('GET', 'POST', 'OPTIONS');
      headers.append('Authorization', `Bearer ${token}`);
      this.http.get('/api/v1/grupos', { headers: headers })
        .subscribe(
        response => {
          that._data = response.json();
        },
        error => {
          console.log(error);
        }
      );

    }).catch(err => console.log(err));
  }

}
