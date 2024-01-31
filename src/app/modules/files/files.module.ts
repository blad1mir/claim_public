import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './files.component';
import { PoliciesComponent } from './policies/policies.component';
import { HomeAddressComponent } from './home-address/home-address.component';



@NgModule({
  declarations: [
    FilesComponent,
    PoliciesComponent,
    HomeAddressComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FilesModule { }
