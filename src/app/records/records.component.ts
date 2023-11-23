import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';

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
  showCompaniesProfile: boolean = false;
  showUserEdit: boolean = false;

  onToggleSideNav(data: SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.communicationService.userClicked$.subscribe(() => {
      this.showCompanies = false;
      this.showUserProfile = false;
      this.showCompaniesProfile = false;
      this.showUserEdit = false;
      this.showUsers = true;
    });

    this.communicationService.companyClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompaniesProfile = false;
      this.showUserEdit = false;
      this.showCompanies = true;
    });

    this.communicationService.userProfileClicked$.subscribe(() => {
      this.showCompanies = false;
      this.showUsers = false;
      this.showCompaniesProfile = false;
      this.showUserEdit = false;
      this.showUserProfile = true;
    });

    this.communicationService.userEditClicked$.subscribe(() => {
      this.showCompanies = false;
      this.showUsers = false;
      this.showCompaniesProfile = false;
      this.showUserProfile = false;
      this.showUserEdit = true;
    });

    this.communicationService.companyProfileClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompanies = false;
      this.showUserEdit = false;
      this.showCompaniesProfile = true;
    });
  }
}
