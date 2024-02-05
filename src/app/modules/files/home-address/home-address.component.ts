import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommunicationService } from 'src/app/communication.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home-address',
  templateUrl: './home-address.component.html',
  styleUrls: ['./home-address.component.scss', '.././files.component.scss']
})
export class HomeAddressComponent implements OnInit {

  city: string = '';
  country: string = '';
  state: string = '';
  street: string = '';
  zip_code: string = '';
  homeAddress: any[]=[];

  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchHomeAddress();
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

  fetchHomeAddress(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const fileId = this.authService.getProfileFileId();

      this.http.get(`http://v.claimcenter.com:8000/api/home_address/${fileId}/`, { headers })
        .subscribe(
          (response: any) => {
            console.log('homeAddress:', response);
            this.homeAddress = response;
            this.city = response.city;
            this.country = response.country;
            this.state = response.state;
            this.street = response.street;
            this.zip_code = response.zip_code;
          },
          (error) => {
            console.error('Error fetching homeAddress:', error);
          }
        );
    } else {
      console.error('No hay token de autorización disponible.');
    }
  }

}
