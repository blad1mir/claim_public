import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsComponent } from './records/records.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guard/auth.guard';


const routes: Routes = [
  {
    path:'', component:LoginComponent
  },
  {
    path:'login',component: LoginComponent
  },
  {
    path: 'records',
    component: RecordsComponent,
    canActivate: [AuthGuard],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
