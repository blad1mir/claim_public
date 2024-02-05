import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommunicationService } from 'src/app/communication.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-accidents',
  templateUrl: './accidents.component.html',
  styleUrls: ['./accidents.component.scss', '.././files.component.scss']
})
export class AccidentsComponent implements OnInit {

  claims_handler: string = '';
  handler_code: string = '';
  client_reference: string = '';
  assistance_reference: string = '';
  claim_causes: string = '';
  ccs_company_reference: string = '';

  accident: any[]=[];

  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchAccident();
  }

  onProfileAccidentsClicked() {
    this.communicationService.emitProfileAccidentsClicked();
  }

  onProfileCommunitiesClicked() {
    this.communicationService.emitProfileCommunitiesClicked();
  }

  onProfileHomeAddressClicked() {
    this.communicationService.emitProfileHomeAddressClicked();
  }

  onProfileInsuranceClicked() {
    this.communicationService.emitProfileInsuranceClicked();
  }

  onProfilePoliciesClicked() {
    this.communicationService.emitProfilePoliciesClicked();
  }

  emitProfileFilesClicked() {
    this.communicationService.emitProfileFilesClicked();
  }

  fetchAccident(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const fileId = this.authService.getProfileFileId();

      this.http.get(`http://v.claimcenter.com:8000/api/accidents/${fileId}/`, { headers })
        .subscribe(
          (response: any) => {
            console.log('accident:', response);
            this.accident = response;
            this.claims_handler = response.claims_handler;
            this.handler_code = response.handler_code;
            this.client_reference = response.client_reference;
            this.assistance_reference = response.assistance_reference;
            this.claim_causes = response.claim_causes;
            this.ccs_company_reference = response.ccs_company_reference;
          },
          (error) => {
            console.error('Error fetching accident:', error);
          }
        );
    } else {
      console.error('No hay token de autorización disponible.');
    }
  }

}
