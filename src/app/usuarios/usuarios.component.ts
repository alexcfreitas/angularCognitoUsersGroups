import { Component, OnInit } from '@angular/core';
import { AuthorizationService} from "../shared/authorization.service";
import {RestApiService} from "../shared/restapi.service";
import {Http, Headers} from "@angular/http";

export class PersonWithCars {
  constructor(public name: string, public age: number) { }
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  _data : any;

  constructor(private http: Http, private auth: AuthorizationService, private api:RestApiService) { }

  ngOnInit() {
    var authenticatedUser = this.auth.getAuthenticatedUser();
    if (authenticatedUser == null) {
      return;
    }

    this.api.obterUsuarios().then(data => {
      this._data = data;
    }).catch(err => console.log(err));

    // this.auth.getAuthenticatedUser().then(session => {
    //   let token = session.getIdToken().getJwtToken();
    //   var that = this;
    //   const headers = new Headers();
    //   headers.append('Authorization', `Bearer ${token}`);
    //   this.http.get('/api/v1/usuarios', { headers: headers })
    //     .subscribe(
    //     response => {
    //       that._data = response.json();
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );

    // }).catch(err => console.log(err));
  }

}
