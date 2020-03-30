import { Component, OnInit } from '@angular/core';
import { AuthorizationService} from "../shared/authorization.service";
import {RestApiService} from "../shared/restapi.service";
import {Http, Headers} from "@angular/http";
import { Signer } from "@aws-amplify/core";

@Component({
  selector: 'app-restapi',
  templateUrl: './restapi.component.html',
  styleUrls: ['./restapi.component.css']
})
export class RestApiComponent implements OnInit {
  authenticatedUser:any;
  isAuthorized: Boolean;
  _data : any;

  constructor(private http: Http, private auth: AuthorizationService) { }

  ngOnInit() {
    this.auth.getAuthenticatedUser().then(user => {
      if (user == null) {
        return;
      }
      this.authenticatedUser = user;
      return this.authenticatedUser;
    }).catch(err => console.log(err));


    this.auth
      .getCredentials()
      .then(session => {
        let options = Signer.sign(
          {
            method: "GET",
            url:
              "https://3xh1ivz0bj.execute-api.us-east-1.amazonaws.com/v1/grupos",
            data: null
          },
          {
            access_key: session.AccessKeyId,
            secret_key: session.SecretKey,
            session_token: session.SessionToken
          }
        );

        this.http.get("/api/v1/grupos", options).subscribe(
          response => {
            this._data = response.json().Groups;
          },
          error => {
            console.log(`Error: ${error.status} , ${error._body}`);
          }
        );
      })
      .catch(err => console.log(err));


  }

}
