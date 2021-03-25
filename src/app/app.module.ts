import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MsalModule, MsalService, MsalGuard, MsalInterceptor } from "@azure/msal-angular";
import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation } from "@azure/msal-browser";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MsalModule.forRoot({ // MSAL Configuration
        auth: {
            clientId: "",
            authority: "https://login.microsoftonline.com/common/",
            redirectUri: "http://localhost:4200/",
            postLogoutRedirectUri: "http://localhost:4200/",
            navigateToLoginRequestUrl: true
        },
        cache: {
            cacheLocation : BrowserCacheLocation.LocalStorage,
            storeAuthStateInCookie: true, // set to true for IE 11
        },
        system: {
            loggerOptions: {
                loggerCallback: () => {},
                piiLoggingEnabled: false
            }
        }
    }, {
        interactionType: InteractionType.Popup, // MSAL Guard Configuration
        authRequest: {
          scopes: ['user.read']
        },
        loginFailedRoute: "/login-failed" 
    }, {
        interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
        protectedResourceMap
    })
],
providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
]
})
export class AppModule { }
