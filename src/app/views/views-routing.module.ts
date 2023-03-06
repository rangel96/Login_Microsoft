import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewsComponent } from './views.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RestrictedPageComponent } from './restricted-page/restricted-page.component';
import { MsalGuard } from '../core/utils/guards/msal.guard';

export const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: 'home', component: HomeComponent,
      },{
      path: 'restricted-page', component: RestrictedPageComponent, canActivate: [MsalGuard]
      }, {
      path: '**', redirectTo: 'home'
      }
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class ViewsRoutingModule {}
