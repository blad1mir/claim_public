import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../communication.service';
import { HttpClientService } from 'src/app/core/http/data-layer/http-client.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  apiUrl1= 'http://v.claimcenter.com:8000/api/';

  user = {
    username : 'blad',
    password : '28A3_0005'
  }
  companyProfiles: any;

  constructor(
    private communicationService: CommunicationService,
    public service: HttpClientService,
    public http: HttpClient) {
      this.http.get(this.apiUrl1 + 'enterprises/').subscribe(data => {
        this.companyProfiles = data;
        console.log(data);
      });
     }

  ngOnInit(): void {
  }

  onCompanyProfileClick() {
    this.communicationService.emitCompanyProfileClicked();
  }

}
