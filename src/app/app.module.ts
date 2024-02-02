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
import { LandingComponent } from './modules/landing/landing.component';
import { ChangePasswordComponent } from './modules/change-password/change-password.component';
import { ProfessionalComponent } from './modules/professional/professional.component';
import { FilesComponent } from './modules/files/files.component';
import { TaskComponent } from './modules/task/task.component';
import { CreateAccidentsComponent } from './modules/files/accidents/create-accidents/create-accidents.component';
import { CreateCommunitiesComponent } from './modules/files/communities/create-communities/create-communities.component';
import { CreateFilesComponent } from './modules/files/create-files/create-files.component';
import { CreateGuaranteeComponent } from './modules/files/guarantee/create-guarantee/create-guarantee.component';
import { CreateHomeAddressComponent } from './modules/files/home-address/create-home-address/create-home-address.component';
import { CreateInsuranceComponent } from './modules/files/insurance/create-insurance/create-insurance.component';
import { CreateMediatorsComponent } from './modules/files/mediators/create-mediators/create-mediators.component';
import { CreatePoliciesComponent } from './modules/files/policies/create-policies/create-policies.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ProfileFileComponent } from './modules/files/profile-file/profile-file.component';
import { AccidentsComponent } from './modules/files/accidents/accidents.component';
import { CommunitiesComponent } from './modules/files/communities/communities.component';
import { GuaranteeComponent } from './modules/files/guarantee/guarantee.component';
import { HomeAddressComponent } from './modules/files/home-address/home-address.component';
import { InsuranceComponent } from './modules/files/insurance/insurance.component';
import { MediatorsComponent } from './modules/files/mediators/mediators.component';
import { PoliciesComponent } from './modules/files/policies/policies.component';

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
    LandingComponent,
    ChangePasswordComponent,
    ProfessionalComponent,
    FilesComponent,
    TaskComponent,
    CreateAccidentsComponent,
    CreateCommunitiesComponent,
    CreateFilesComponent,
    CreateGuaranteeComponent,
    CreateHomeAddressComponent,
    CreateInsuranceComponent,
    CreateMediatorsComponent,
    CreatePoliciesComponent,

    ProfileFileComponent,
    AccidentsComponent,
    CommunitiesComponent,
    GuaranteeComponent,
    HomeAddressComponent,
    InsuranceComponent,
    MediatorsComponent,
    PoliciesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule,
    DropDownListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
