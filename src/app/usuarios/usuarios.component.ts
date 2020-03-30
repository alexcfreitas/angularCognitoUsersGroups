import { Component, OnInit } from "@angular/core";
import { AuthorizationService } from "../shared/authorization.service";
import { RestApiService } from "../shared/restapi.service";
import { Http, Headers } from "@angular/http";
import { Signer } from "@aws-amplify/core";
import lodash from "lodash";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"]
})
export class UsuariosComponent implements OnInit {
  authenticatedUser:any;
  _data: any;
  responseData: any;
  error: String;
  isAuthorizedViewPage: Boolean = true;

  constructor(
    private http: Http,
    private auth: AuthorizationService,
  ) {}

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
              "https://3xh1ivz0bj.execute-api.us-east-1.amazonaws.com/v1/usuarios",
            data: null
          },
          {
            access_key: session.AccessKeyId,
            secret_key: session.SecretKey,
            session_token: session.SessionToken
          }
        );

        this.http.get("/api/v1/usuarios", options).subscribe(
          response => {
            this._data = response.json().Users;
          },
          error => {
            console.log(error);
            if(error.status == 403){
              this.isAuthorizedViewPage = false;
              return this.error = "Ops, você não possui permissão para acessar esta Página.";
            }
            return this.error = "Ocorreu um erro ao Criar um Usuário.";
          }
        );
      })
      .catch(err => console.log(err));
  }
}
