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

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.communicationService.userClicked$.subscribe(() => {
      this.showUsers = false;
      this.showCompanies = true;
    });

    this.communicationService.companyClicked$.subscribe(() => {
      this.showCompanies = false;
      this.showUsers = true;
    });
  }
}
