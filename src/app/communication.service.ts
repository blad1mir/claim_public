import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private userClickedSource = new Subject<boolean | string>();
  userClicked$ = this.userClickedSource.asObservable();

  private companyClickedSource = new Subject<boolean | string>();
  companyClicked$ = this.companyClickedSource.asObservable();

  private userProfileClickedSource = new Subject<boolean | string>(); // Puede ser booleano o string
  userProfileClicked$ = this.userProfileClickedSource.asObservable();

  private userEditClickedSource = new Subject<boolean>();
  userEditClicked$ = this.userEditClickedSource.asObservable();

  private companyProfileClickedSource = new Subject<boolean | string>();
  companyProfileClicked$ = this.companyProfileClickedSource.asObservable();

  private createUserClickedSource = new Subject<boolean>();
  createUserClicked$ = this.createUserClickedSource.asObservable();

  private createCompanyClickedSource = new Subject<boolean>();
  createCompanyClicked$ = this.createCompanyClickedSource.asObservable();

  private createProfessionalClickedSource = new Subject<boolean>();
  createProfessionalClicked$ = this.createProfessionalClickedSource.asObservable();


  emitUserClicked() {
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false)
    this.createUserClickedSource.next(false);
    this.userClickedSource.next(true);
  }

  emitUserProfileClicked(usernameOrBoolean?: boolean | string) {
    this.userClickedSource.next(false);
    this.companyClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false)
    this.createUserClickedSource.next(false);
    if (typeof usernameOrBoolean === 'string') {
      this.userProfileClickedSource.next(usernameOrBoolean);
    } else {
      this.userProfileClickedSource.next(true);
    }
  }

  emitPeopleClicked(PeopleOrBoolean?: boolean | string) {
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false)
    this.createUserClickedSource.next(false);
    if (typeof PeopleOrBoolean === 'string') {
      this.userClickedSource.next(PeopleOrBoolean);
    } else {
      this.userClickedSource.next(true);
    }
  }

  emitCompanyClicked(CompanyOrBoolean?: boolean | string) {
    this.userClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false)
    this.createUserClickedSource.next(false);
    if (typeof CompanyOrBoolean === 'string') {
      this.companyClickedSource.next(CompanyOrBoolean);
    } else {
      this.companyClickedSource.next(true);
    }
  }

  emitUserEditClicked() {
    this.userClickedSource.next(false);
    this.companyClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false)
    this.createUserClickedSource.next(false);
    this.userEditClickedSource.next(true);
  }

  emitCompanyProfileClicked(CompanyOrBoolean?: boolean | string) {
    this.userClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false)
    this.createUserClickedSource.next(false);
    if (typeof CompanyOrBoolean === 'string') {
      this.companyProfileClickedSource.next(CompanyOrBoolean);
    } else {
      this.companyProfileClickedSource.next(true);
    }
  }

  emitCreateUserClicked() {
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false)
    this.createUserClickedSource.next(true);
  }

  emitCreateCompanyClicked() {
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createProfessionalClickedSource.next(false)
    this.createCompanyClickedSource.next(true);
  }

  emitCreateProfesssionalClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(true)
  }
}
