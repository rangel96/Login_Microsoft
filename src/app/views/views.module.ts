import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ViewsComponent } from './views.component';
import { ViewsRoutingModule } from './views-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MSAL_INSTANCE, MsalService } from '@azure/msal-angular';
import { MSALInstanceFactory } from '../app.module';
import { RestrictedPageComponent } from './restricted-page/restricted-page.component';



@NgModule({
  declarations: [
    ViewsComponent,
    HomeComponent,
    LoginComponent,
    RestrictedPageComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    RouterOutlet,
    RouterLink,
  ],
  providers: [
    { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory },
    MsalService
  ],
})
export class ViewsModule { }
