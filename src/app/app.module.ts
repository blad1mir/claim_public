import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordsComponent } from './records/records.component';
import { LoginComponent } from './login/login.component';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { UsersComponent } from './users/users.component';
import { CompaniesComponent } from './companies/companies.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    RecordsComponent,
    LoginComponent,
    NavbarMenuComponent,
    TopMenuComponent,
    UsersComponent,
    CompaniesComponent,
    UserProfileComponent,
    CompanyProfileComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
