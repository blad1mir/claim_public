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
      this.showProfessional = true;
    });
  }
}
