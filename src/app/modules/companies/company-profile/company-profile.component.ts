import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/communication.service';
import { HttpClientService } from 'src/app/core/http/data-layer/http-client.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  private readonly baseUrl: string = environment.apiUrl;
  companyProfiles: any;

  constructor(
    private communicationService: CommunicationService,
    public service: HttpClientService,
    public http: HttpClient) {
      this.http.get(this.baseUrl + 'enterprises/').subscribe(data => {
        this.companyProfiles = data;
        console.log(data);
      });
     }

  ngOnInit(): void {
  }

}
