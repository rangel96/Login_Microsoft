import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG,
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService
} from '@azure/msal-angular';
import {InteractionType, IPublicClientApplication, PublicClientApplication} from '@azure/msal-browser';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";


export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientId,
      redirectUri: 'http://localhost:4200'
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read', 'mail.read']);
  // protectedResourceMap.set('http://localhost:8080/hello', ['api://d16e1a06-3be2-4ae1-8bd4-718c19cecac3/hello']);

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap
  }
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory },
    { provide: MSAL_INTERCEPTOR_CONFIG, useFactory: MSALInterceptorConfigFactory },
    MsalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
