import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordsComponent } from './records/records.component';
import { LoginComponent } from './login/login.component';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { UsersComponent } from './modules/users/users.component';
import { CompaniesComponent } from './modules/companies/companies.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './modules/users/user-profile/user-profile.component';
import { CompanyProfileComponent } from './modules/companies/company-profile/company-profile.component';
import { UserEditComponent } from './modules/users/user-edit/user-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserCreateComponent } from './modules/users/user-create/user-create.component';
import { CompanyCreateComponent } from './modules/companies/company-create/company-create.component';

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
    UserEditComponent,
    UserCreateComponent,
    CompanyCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
