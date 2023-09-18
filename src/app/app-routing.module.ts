import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsComponent } from './records/records.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:'', component:LoginComponent
  },
  {
    path:'login',component: LoginComponent
  },
  {
    path:'records',component: RecordsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
