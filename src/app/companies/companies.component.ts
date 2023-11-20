import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
  }

  onCompanyProfileClick() {
    this.communicationService.emitCompanyProfileClicked();
  }

}
