import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Amplify from '@aws-amplify/core';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

Amplify.configure({
  Auth: {
      // REQUIRED - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-east-1:32d37b11-8dc3-4c68-989e-37f473ae6e1e',
      // REQUIRED - Amazon Cognito Region
      region: 'us-east-1',
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-east-1_dEPYViRBr',
      // OPTIONAL - Amazon Cognito Web Client ID
      userPoolWebClientId: '19vbljuhurhatglavpe5fidohq',
  },
  API: {
    endpoints: [
        {
            name: "portalConveniados",
            // endpoint: "https://3xh1ivz0bj.execute-api.us-east-1.amazonaws.com/v1",
            endpoint: "http://localhost:4200/api",
            // custom_header: async () => {
            //   return {
            //     // "Access-Control-Allow-Origin": "*",
            //     // "Content-Type": "application/json",
            //     // "Access-Control-Allow-Credentials": "true"
            //   }
            // },
            service: "execute-api",
            region: "us-east-1"
        }
    ]
  }
});
