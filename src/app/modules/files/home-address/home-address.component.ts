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

  editEnabled: boolean = false;

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

  private showWarningMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
    });
  }

  onEditEnabledClicked(){
    this.editEnabled = true;
  }

  updateHomeAddress(): void {
    if (!this.country || !this.state || !this.city || !this.street || !this.zip_code){
      this.showWarningMessage('Por favor, complete todos los campos.'); return;
    }
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const homeAddressData = {
        file_id:this.authService.getFileId(),
        country:this.country,
        state:this.state,
        city:this.city,
        street:this.street,
        zip_code:this.zip_code,
      };

      const fileId = this.authService.getProfileFileId();

      this.http.put(`http://v.claimcenter.com:8000/api/home_address/${fileId}/`, homeAddressData, { headers }).subscribe(
        (response) => {
          console.log('Vivienda editada exitosamente', response);
          this.showWarningMessage('Vivienda editada exitosamente');

          this.editEnabled = false;

        },
        (error) => {
          console.error('Error al editar la Vivienda', error);
          this.showWarningMessage('Error al editar la Vivienda');
        }
      );
    } else {
      console.error('No hay token de autorización disponible.');
      this.showWarningMessage('Su sesión ha expirado');
    }
  }

}
