import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { AuthService } from '../core/services/auth.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  title = 'sidenav'

  isSideNavCollapsed = false;
  screenWidth = 0;
  showUsers: boolean = false;
  showCompanies: boolean = false;
  showUserProfile: boolean = false;
  landing: boolean = false;
  showCompaniesProfile: boolean = false;
  showUserEdit: boolean = false;
  showCreateUser: boolean = false;
  showCreateCompany: boolean = false;
  showChangePassword: boolean = false;
  showProfessional: boolean = false;
  showFiles: boolean = false;
  showTask: boolean = false;

  showCreateAccidents: boolean = false;
  showCreateCommunities: boolean = false;
  showCreateFiles: boolean = false;
  showCreateGuarantee: boolean = false;
  showCreateHomeAddress: boolean = false;
  showCreateInsurance: boolean = false;
  showCreateMediators: boolean = false;
  showCreatePolicies: boolean = false;

  onToggleSideNav(data: SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  constructor(
    private communicationService: CommunicationService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {

    if (this.authService.getVerified() === 'true') {
      this.landing = true;
    } else {
      this.showChangePassword = true;
    }

    this.communicationService.userClicked$.subscribe(() => {
      this.showCompanies = false;
      this.showUserProfile = false;
      this.showCompaniesProfile = false;
      this.showUserEdit = false;
      this.showCreateUser = false;
      this.showCreateCompany = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showProfessional = false;
      this.showFiles = false;
      this.showTask = false;
      this.showCreateAccidents = false;
      this.showCreateCommunities = false;
      this.showCreateFiles = false;
      this.showCreateGuarantee = false;
      this.showCreateHomeAddress = false;
      this.showCreateInsurance = false;
      this.showCreateMediators = false;
      this.showCreatePolicies = false;
      this.showUsers = true;
    });
    this.communicationService.companyClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompaniesProfile = false;
      this.showUserEdit = false;
      this.showCreateUser = false;
      this.showCreateCompany = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showProfessional = false;
      this.showFiles = false;
      this.showTask = false;
      this.showCreateAccidents = false;
      this.showCreateCommunities = false;
      this.showCreateFiles = false;
      this.showCreateGuarantee = false;
      this.showCreateHomeAddress = false;
      this.showCreateInsurance = false;
      this.showCreateMediators = false;
      this.showCreatePolicies = false;
      this.showCompanies = true;
    });

    this.communicationService.userProfileClicked$.subscribe(() => {
      this.showCompanies = false;
      this.showUsers = false;
      this.showCompaniesProfile = false;
      this.showUserEdit = false;
      this.showCreateUser = false;
      this.showCreateCompany = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showProfessional = false;
      this.showFiles = false;
      this.showTask = false;
      this.showCreateAccidents = false;
      this.showCreateCommunities = false;
      this.showCreateFiles = false;
      this.showCreateGuarantee = false;
      this.showCreateHomeAddress = false;
      this.showCreateInsurance = false;
      this.showCreateMediators = false;
      this.showCreatePolicies = false;
      this.showUserProfile = true;
    });

    this.communicationService.userEditClicked$.subscribe(() => {
      this.showCompanies = false;
      this.showUsers = false;
      this.showCompaniesProfile = false;
      this.showUserProfile = false;
      this.showCreateUser = false;
      this.showCreateCompany = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showProfessional = false;
      this.showFiles = false;
      this.showTask = false;
      this.showCreateAccidents = false;
      this.showCreateCommunities = false;
      this.showCreateFiles = false;
      this.showCreateGuarantee = false;
      this.showCreateHomeAddress = false;
      this.showCreateInsurance = false;
      this.showCreateMediators = false;
      this.showCreatePolicies = false;
      this.showUserEdit = true;
    });

    this.communicationService.companyProfileClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompanies = false;
      this.showUserEdit = false;
      this.showCreateUser = false;
      this.showCreateCompany = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showProfessional = false;
      this.showFiles = false;
      this.showTask = false;
      this.showCreateAccidents = false;
      this.showCreateCommunities = false;
      this.showCreateFiles = false;
      this.showCreateGuarantee = false;
      this.showCreateHomeAddress = false;
      this.showCreateInsurance = false;
      this.showCreateMediators = false;
      this.showCreatePolicies = false;
      this.showCompaniesProfile = true;
    });

    this.communicationService.createUserClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompanies = false;
      this.showUserEdit = false;
      this.showCompaniesProfile = false;
      this.showCreateCompany = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showProfessional = false;
      this.showFiles = false;
      this.showTask = false;
      this.showCreateAccidents = false;
      this.showCreateCommunities = false;
      this.showCreateFiles = false;
      this.showCreateGuarantee = false;
      this.showCreateHomeAddress = false;
      this.showCreateInsurance = false;
      this.showCreateMediators = false;
      this.showCreatePolicies = false;
      this.showCreateUser = true;
    });

    this.communicationService.createCompanyClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompanies = false;
      this.showUserEdit = false;
      this.showCompaniesProfile = false;
      this.showCreateUser = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showProfessional = false;
      this.showFiles = false;
      this.showTask = false;
      this.showCreateAccidents = false;
      this.showCreateCommunities = false;
      this.showCreateFiles = false;
      this.showCreateGuarantee = false;
      this.showCreateHomeAddress = false;
      this.showCreateInsurance = false;
      this.showCreateMediators = false;
      this.showCreatePolicies = false;
      this.showCreateCompany = true;
    });

    this.communicationService.createProfessionalClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompanies = false;
      this.showUserEdit = false;
      this.showCompaniesProfile = false;
      this.showCreateUser = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showCreateCompany = false;
      this.showFiles = false;
      this.showTask = false;
      this.showCreateAccidents = false;
      this.showCreateCommunities = false;
      this.showCreateFiles = false;
      this.showCreateGuarantee = false;
      this.showCreateHomeAddress = false;
      this.showCreateInsurance = false;
      this.showCreateMediators = false;
      this.showCreatePolicies = false;
      this.showProfessional = true;
    });

    this.communicationService.filesClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompanies = false;
      this.showUserEdit = false;
      this.showCompaniesProfile = false;
      this.showCreateUser = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showCreateCompany = false;
      this.showProfessional = false;
      this.showTask = false;
      this.showCreateAccidents = false;
      this.showCreateCommunities = false;
      this.showCreateFiles = false;
      this.showCreateGuarantee = false;
      this.showCreateHomeAddress = false;
      this.showCreateInsurance = false;
      this.showCreateMediators = false;
      this.showCreatePolicies = false;
      this.showFiles = true;
    });

    this.communicationService.taskClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompanies = false;
      this.showUserEdit = false;
      this.showCompaniesProfile = false;
      this.showCreateUser = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showCreateCompany = false;
      this.showProfessional = false;
      this.showFiles = false;
      this.showCreateAccidents = false;
      this.showCreateCommunities = false;
      this.showCreateFiles = false;
      this.showCreateGuarantee = false;
      this.showCreateHomeAddress = false;
      this.showCreateInsurance = false;
      this.showCreateMediators = false;
      this.showCreatePolicies = false;
      this.showTask = true;
    });

    this.communicationService.createFilesClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompanies = false;
      this.showUserEdit = false;
      this.showCompaniesProfile = false;
      this.showCreateUser = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showCreateCompany = false;
      this.showProfessional = false;
      this.showFiles = false;
      this.showCreateAccidents = false;
      this.showCreateCommunities = false;
      this.showCreateFiles = true;
      this.showCreateGuarantee = false;
      this.showCreateHomeAddress = false;
      this.showCreateInsurance = false;
      this.showCreateMediators = false;
      this.showCreatePolicies = false;
      this.showTask = false;
    });

    this.communicationService.createAccidentsClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompanies = false;
      this.showUserEdit = false;
      this.showCompaniesProfile = false;
      this.showCreateUser = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showCreateCompany = false;
      this.showProfessional = false;
      this.showFiles = false;
      this.showCreateAccidents = true;
      this.showCreateCommunities = false;
      this.showCreateFiles = false;
      this.showCreateGuarantee = false;
      this.showCreateHomeAddress = false;
      this.showCreateInsurance = false;
      this.showCreateMediators = false;
      this.showCreatePolicies = false;
      this.showTask = false;
    });

    this.communicationService.createCommunitiesClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompanies = false;
      this.showUserEdit = false;
      this.showCompaniesProfile = false;
      this.showCreateUser = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showCreateCompany = false;
      this.showProfessional = false;
      this.showFiles = false;
      this.showCreateAccidents = false;
      this.showCreateCommunities = true;
      this.showCreateFiles = false;
      this.showCreateGuarantee = false;
      this.showCreateHomeAddress = false;
      this.showCreateInsurance = false;
      this.showCreateMediators = false;
      this.showCreatePolicies = false;
      this.showTask = false;
    });

    this.communicationService.createGuaranteeClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompanies = false;
      this.showUserEdit = false;
      this.showCompaniesProfile = false;
      this.showCreateUser = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showCreateCompany = false;
      this.showProfessional = false;
      this.showFiles = false;
      this.showCreateAccidents = false;
      this.showCreateCommunities = false;
      this.showCreateFiles = false;
      this.showCreateGuarantee = true;
      this.showCreateHomeAddress = false;
      this.showCreateInsurance = false;
      this.showCreateMediators = false;
      this.showCreatePolicies = false;
      this.showTask = false;
    });

    this.communicationService.createHomeAddressClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompanies = false;
      this.showUserEdit = false;
      this.showCompaniesProfile = false;
      this.showCreateUser = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showCreateCompany = false;
      this.showProfessional = false;
      this.showFiles = false;
      this.showCreateAccidents = false;
      this.showCreateCommunities = false;
      this.showCreateFiles = false;
      this.showCreateGuarantee = false;
      this.showCreateHomeAddress = true;
      this.showCreateInsurance = false;
      this.showCreateMediators = false;
      this.showCreatePolicies = false;
      this.showTask = false;
    });

    this.communicationService.createInsuranceClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompanies = false;
      this.showUserEdit = false;
      this.showCompaniesProfile = false;
      this.showCreateUser = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showCreateCompany = false;
      this.showProfessional = false;
      this.showFiles = false;
      this.showCreateAccidents = false;
      this.showCreateCommunities = false;
      this.showCreateFiles = false;
      this.showCreateGuarantee = false;
      this.showCreateHomeAddress = false;
      this.showCreateInsurance = true;
      this.showCreateMediators = false;
      this.showCreatePolicies = false;
      this.showTask = false;
    });

    this.communicationService.createMediatorsClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompanies = false;
      this.showUserEdit = false;
      this.showCompaniesProfile = false;
      this.showCreateUser = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showCreateCompany = false;
      this.showProfessional = false;
      this.showFiles = false;
      this.showCreateAccidents = false;
      this.showCreateCommunities = false;
      this.showCreateFiles = false;
      this.showCreateGuarantee = false;
      this.showCreateHomeAddress = false;
      this.showCreateInsurance = false;
      this.showCreateMediators = true;
      this.showCreatePolicies = false;
      this.showTask = false;
    });

    this.communicationService.createPoliciesClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompanies = false;
      this.showUserEdit = false;
      this.showCompaniesProfile = false;
      this.showCreateUser = false;
      this.landing = false;
      this.showChangePassword = false;
      this.showCreateCompany = false;
      this.showProfessional = false;
      this.showFiles = false;
      this.showCreateAccidents = false;
      this.showCreateCommunities = false;
      this.showCreateFiles = false;
      this.showCreateGuarantee = false;
      this.showCreateHomeAddress = false;
      this.showCreateInsurance = false;
      this.showCreateMediators = false;
      this.showCreatePolicies = true;
      this.showTask = false;
    });
  }
}
