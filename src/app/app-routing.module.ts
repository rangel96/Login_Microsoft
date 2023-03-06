import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewsModule } from './views/views.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/views.module').then( () => ViewsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
