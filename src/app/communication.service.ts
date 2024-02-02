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

  private filesClickedSource = new Subject<boolean>();
  filesClicked$ = this.filesClickedSource.asObservable();

  private taskClickedSource = new Subject<boolean>();
  taskClicked$ = this.taskClickedSource.asObservable();

  private createFilesClickedSource = new Subject<boolean>();
  createFilesClicked$ = this.createFilesClickedSource.asObservable();

  private createAccidentsClickedSource = new Subject<boolean>();
  createAccidentsClicked$ = this.createAccidentsClickedSource.asObservable();

  private createCommunitiesClickedSource = new Subject<boolean>();
  createCommunitiesClicked$ = this.createCommunitiesClickedSource.asObservable();

  private createGuaranteeClickedSource = new Subject<boolean>();
  createGuaranteeClicked$ = this.createGuaranteeClickedSource.asObservable();

  private createHomeAddressClickedSource = new Subject<boolean>();
  createHomeAddressClicked$ = this.createHomeAddressClickedSource.asObservable();

  private createInsuranceClickedSource = new Subject<boolean>();
  createInsuranceClicked$ = this.createInsuranceClickedSource.asObservable();

  private createMediatorsClickedSource = new Subject<boolean>();
  createMediatorsClicked$ = this.createMediatorsClickedSource.asObservable();

  private createPoliciesClickedSource = new Subject<boolean>();
  createPoliciesClicked$ = this.createPoliciesClickedSource.asObservable();

  private profileFilesClickedSource = new Subject<boolean>();
  profileFilesClicked$ = this.profileFilesClickedSource.asObservable();

  private profileAccidentsClickedSource = new Subject<boolean>();
  profileAccidentsClicked$ = this.profileAccidentsClickedSource.asObservable();

  private profileCommunitiesClickedSource = new Subject<boolean>();
  profileCommunitiesClicked$ = this.profileCommunitiesClickedSource.asObservable();

  private profileGuaranteeClickedSource = new Subject<boolean>();
  profileGuaranteeClicked$ = this.profileGuaranteeClickedSource.asObservable();

  private profileHomeAddressClickedSource = new Subject<boolean>();
  profileHomeAddressClicked$ = this.profileHomeAddressClickedSource.asObservable();

  private profileInsuranceClickedSource = new Subject<boolean>();
  profileInsuranceClicked$ = this.profileInsuranceClickedSource.asObservable();

  private profileMediatorsClickedSource = new Subject<boolean>();
  profileMediatorsClicked$ = this.profileMediatorsClickedSource.asObservable();

  private profilePoliciesClickedSource = new Subject<boolean>();
  profilePoliciesClicked$ = this.profilePoliciesClickedSource.asObservable();

  emitUserClicked() {
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false)
    this.createUserClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

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
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

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
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

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
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

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
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

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
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)
    this.filesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

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
    this.filesClickedSource.next(false)
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

    this.createUserClickedSource.next(true);
  }

  emitCreateCompanyClicked() {
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

    this.createCompanyClickedSource.next(true);
  }

  emitCreateProfesssionalClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.filesClickedSource.next(false)
    this.createCompanyClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

    this.createProfessionalClickedSource.next(true)
  }

  emiFilesClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false)
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

    this.filesClickedSource.next(true)
  }

  emiTaskClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.filesClickedSource.next(false);

    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

    this.taskClickedSource.next(true);
  }

  emitCreateAccidentsClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

    this.createAccidentsClickedSource.next(true)
  }

  emitCreateCommunitiesClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

    this.createCommunitiesClickedSource.next(true)
  }

  emitCreateFilesClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

    this.createFilesClickedSource.next(true)
  }

  emitCreateGuaranteeClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

    this.createGuaranteeClickedSource.next(true)
  }

  emitCreateHomeAddressClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

    this.createHomeAddressClickedSource.next(true)
  }

  emitCreateInsuranceClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

    this.createInsuranceClickedSource.next(true)
  }

  emitCreateMediatorsClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

    this.createMediatorsClickedSource.next(true)
  }

  emitCreatePoliciesClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(false)

    this.createPoliciesClickedSource.next(true)
  }

  emitProfileAccidentsClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)
    this.createAccidentsClickedSource.next(false)

    this.profileCommunitiesClickedSource.next(false)
    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(true)
  }

  emitProfileCommunitiesClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)

    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileCommunitiesClickedSource.next(true)
  }

  emitProfileFilesClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)
    this.createFilesClickedSource.next(false)

    this.profileCommunitiesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileFilesClickedSource.next(true)
  }

  emitProfileGuaranteeClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)

    this.profileCommunitiesClickedSource.next(false)
    this.profileFilesClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(true)
  }

  emitProfileHomeAddressClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)

    this.profileCommunitiesClickedSource.next(false)
    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(true)
  }

  emitProfileInsuranceClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)

    this.profileCommunitiesClickedSource.next(false)
    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileInsuranceClickedSource.next(true)
  }

  emitProfileMediatorsClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)

    this.profileCommunitiesClickedSource.next(false)
    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profilePoliciesClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profileMediatorsClickedSource.next(true)
  }

  emitProfilePoliciesClicked(){
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(false);
    this.createUserClickedSource.next(false);
    this.createCompanyClickedSource.next(false);
    this.createProfessionalClickedSource.next(false);
    this.filesClickedSource.next(false);
    this.taskClickedSource.next(false);
    this.createAccidentsClickedSource.next(false)
    this.createCommunitiesClickedSource.next(false)
    this.createFilesClickedSource.next(false)
    this.createGuaranteeClickedSource.next(false)
    this.createHomeAddressClickedSource.next(false)
    this.createInsuranceClickedSource.next(false)
    this.createMediatorsClickedSource.next(false)
    this.createPoliciesClickedSource.next(false)

    this.profileCommunitiesClickedSource.next(false)
    this.profileFilesClickedSource.next(false)
    this.profileGuaranteeClickedSource.next(false)
    this.profileHomeAddressClickedSource.next(false)
    this.profileInsuranceClickedSource.next(false)
    this.profileMediatorsClickedSource.next(false)
    this.profileAccidentsClickedSource.next(false)
    this.profilePoliciesClickedSource.next(true)
  }

}
