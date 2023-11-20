import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  showUsers: boolean = false;
  showCompanies: boolean = false;
  showUserProfile: boolean = false;
  showCompaniesProfile: boolean = false;

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.communicationService.userClicked$.subscribe(() => {
      this.showCompanies = false;
      this.showUserProfile = false;
      this.showCompaniesProfile = false;
      this.showUsers = true;
    });

    this.communicationService.companyClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompaniesProfile = false;
      this.showCompanies = true;
    });

    this.communicationService.userProfileClicked$.subscribe(() => {
      this.showCompanies = false;
      this.showUsers = false;
      this.showCompaniesProfile = false;
      this.showUserProfile = true;
    });

    this.communicationService.companyProfileClicked$.subscribe(() => {
      this.showUsers = false;
      this.showUserProfile = false;
      this.showCompanies = false;
      this.showCompaniesProfile = true;
    });
  }
}
