import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommunicationService } from 'src/app/communication.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss', '.././files.component.scss']
})
export class InsuranceComponent implements OnInit {

  city: string = '';
  country: string = '';
  state: string = '';
  street: string = '';
  zip_code: string = '';
  email: string = '';
  legal_document: string = '';
  name: string = '';
  relation: string = '';
  number: string = '';
  number_description: string = '';
  insurance: any[] = [];

  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchInsurance();
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

  fetchInsurance(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const fileId = this.authService.getProfileFileId();

      this.http.get(`http://v.claimcenter.com:8000/api/insured_clients/${fileId}/`, { headers })
        .subscribe(
          (response: any) => {
            console.log('insurance:', response);
            this.insurance = response;
            this.city = response.address.city;
            this.country = response.address.country;
            this.state = response.address.state;
            this.street = response.address.street;
            this.zip_code = response.address.zip_code;
            this.email = response.email;
            this.legal_document = response.legal_document;
            this.name = response.name;
            this.relation = response.relation;
            this.number = response.phones_associated?.phone_number;
            this.number_description = response.phones_associated?.description;
          },
          (error) => {
            console.error('Error fetching insurance:', error);
          }
        );
    } else {
      console.error('No hay token de autorización disponible.');
    }
  }

}
