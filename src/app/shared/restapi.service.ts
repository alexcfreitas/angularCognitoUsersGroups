import { Injectable } from "@angular/core";
import API from "@aws-amplify/api";

@Injectable()
export class RestApiService {
  async obterGrupos() {
    let apiName = "portalConveniados";
    let path = "/grupos";
    let myInit = {
      body: {}, // replace this with attributes you need
      // headers: {} // OPTIONAL
  }
    return await API.post(apiName, path, myInit);
  }

  async obterUsuarios() {
    let apiName = "portalConveniados";
    let path = "/usuarios";
    let myInit = {
      body: null, // replace this with attributes you need
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   "Access-Control-Allow-Credentials": "true"
      // } // OPTIONAL
    }
  // let myInit = {};

    return await API.post(apiName, path, myInit);
  }
}
