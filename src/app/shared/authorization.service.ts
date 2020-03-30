import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import Auth from '@aws-amplify/auth';
import Amplify from "@aws-amplify/core";
import { Signer } from "@aws-amplify/core";

@Injectable()
export class AuthorizationService {
  cognitoUser: any;
  userSession;
  userCredentials: any;
  authenticatedUser:any;
  user: any;


  async register(email, password, role, parceiro) {
    let attributes = {
      'profile': role,
      'custom:conveniado': parceiro
    };
    this.cognitoUser = await Auth.signUp({username:email, password, attributes });
    console.log('thisCognitoUser  -> ',this.cognitoUser);
    return this.cognitoUser;
};

  async confirmAuthCode(code) {
    // console.log(this.cognitoUser.user.username)
    return await Auth.confirmSignUp(this.cognitoUser.user.username, code);
  }

  async signIn(email, password) {
    this.user = await Auth.signIn(email, password);
    return this.user;
  }

  isLoggedIn() {
    return this.user != null;
  }

  async getAuthenticatedUser() {
    try {
      this.authenticatedUser = await Auth.currentSession();
      return this.authenticatedUser;
    }
    catch(e) { console.log('no Session') }
  }

  async getCredentials(){
    try {
      this.userCredentials = await Auth.currentCredentials();
      return this.userCredentials.data.Credentials;
    }
    catch(e) { console.log('no Credentials') }
  }

  logOut() {
    Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
    this.cognitoUser = null;
  }
}
