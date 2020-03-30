import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthorizationService} from "../shared/authorization.service";
import { Router } from '@angular/router';

// https://github.com/aws/amazon-cognito-identity-js
// https://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  confirmCode: boolean = false;
  codeWasConfirmed: boolean = false;
  error: string = "";

  constructor(private auth: AuthorizationService,
              private _router: Router) { }

  register(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const role = form.value.role;
    const parceiro = form.value.parceiro;
    this.auth.register(email, password, role, parceiro).then(
      (data) => {
        this.confirmCode = true;
      })
      .catch((err) => {
        console.log(err);
        this.error = "Ocorreu um erro ao Criar um Usuário.";
      });
  }

  validateAuthCode(form: NgForm) {
    const code = form.value.code;

    this.auth.confirmAuthCode(code).then(
      (data) => {
        //this._router.navigateByUrl('/');
        this.codeWasConfirmed = true;
        this.confirmCode = false;
      },)
      .catch(
      (err) => {
        console.log(err);
        this.error = "Ocorreu Algum erro ao confirmar o codigo.";
      });
  }
}
