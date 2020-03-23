import { Injectable } from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserAttribute} from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs/Observable';
import {CognitoIdentityCredentials} from 'aws-sdk';

const poolData = {
  UserPoolId: 'us-east-1_dEPYViRBr', // Your user pool id here
  ClientId: '19vbljuhurhatglavpe5fidohq' // Your client id here
};

const credenciais = new CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:8cd295f0-8cdd-4e4d-8cde-5cea08d67185',
});


const userPool = new CognitoUserPool(poolData);

@Injectable()
export class AuthorizationService {
  cognitoUser: any;

  constructor() { }

  register(email, password, role, parceiro) {

    const attributeList = [
    ];

    const profile = {
      Name: 'profile',
      Value: role,
    };

    const conveniado = {
      Name: 'custom:conveniado',
      Value: parceiro,
    }

    const attributeProfile = new CognitoUserAttribute(profile);
    const attributeConveniado = new CognitoUserAttribute(conveniado);

    attributeList.push(attributeProfile, attributeConveniado);

    return Observable.create(observer => {
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          console.log("signUp error", err);
          observer.error(err);
        }

        this.cognitoUser = result.user;
        console.log("signUp success", result);
        observer.next(result);
        observer.complete();
      });
    });

  }

  confirmAuthCode(code) {
    const user = {
      Username : this.cognitoUser.username,
      Pool : userPool
    };
    return Observable.create(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log("confirmAuthCode() success", result);
        observer.next(result);
        observer.complete();
      });
    });
  }

  signIn(email, password) {

    const authenticationData = {
      Username : email,
      Password : password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username : email,
      Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);

    return Observable.create(observer => {

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {

          //console.log(result);
          observer.next(result);
          observer.complete();
        },
        onFailure: function(err) {
          console.log(err);
          observer.error(err);
        },
      });
    });
  }

  isLoggedIn() {
    return userPool.getCurrentUser() != null;
  }

  getAuthenticatedUser() {
    // gets the current user from the local storage
    return userPool.getCurrentUser();
  }

  logOut() {
    this.getAuthenticatedUser().signOut();
    this.cognitoUser = null;
  }
}
