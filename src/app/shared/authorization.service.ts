import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import Auth from '@aws-amplify/auth';

@Injectable()
export class AuthorizationService {
  cognitoUser: any;
  userSession;
  user: any;


  async register(email, password, role, parceiro) {

    let attributes = {
      'profile': role,
      'custom:conveniado': parceiro
    };

    this.cognitoUser = await Auth.signUp({username:email, password, attributes });

    return this.cognitoUser;
};

  async confirmAuthCode(code) {
    return await Auth.confirmSignUp(this.cognitoUser.username, code, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true
    });
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
      // let session =  await Auth.currentSession();
      // return {
      //   userIdToken: session.getIdToken().getJwtToken(),
      //   user: session.getIdToken(),
      // }
      return await Auth.currentSession();
    }
    catch(e) { console.log('no session') }
  }

  logOut() {
    Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
    this.cognitoUser = null;
  }
}
