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

  insuredRelationChoises: { name: string, type: string }[] = [];

  editEnabled: boolean = false;


  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchInsurance();
    this.fetchFileTypeOptions();
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

  onEditEnabledClicked(){
    this.editEnabled = true;
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
            this.city = response.address?.city;
            this.country = response.address?.country;
            this.state = response.address?.state;
            this.street = response.address?.street;
            this.zip_code = response.address?.zip_code;
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

  private showWarningMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
    });
  }

  private fetchFileTypeOptions(): void {
    const insuredRelationChoises = this.authService.getInsuredRelationChoises();
    this.insuredRelationChoises = insuredRelationChoises;
    console.log(this.insuredRelationChoises);
  }

  updateInsurance(): void {
    if (!this.name || !this.email || !this.legal_document || !this.country || !this.state || !this.city || !this.street || !this.zip_code || !this.relation || !this.number || !this.number_description){
      this.showWarningMessage('Por favor, complete todos los campos.'); return;
    }
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const insuranceData = {
        file_id:this.authService.getFileId(),
        name: this.name,
        email: this.email,
        //contacts_token: this.contacts_token,
        legal_document: this.legal_document,
        address: {
          country: this.country,
          state: this.state,
          city: this.city,
          street: this.street,
          zip_code: this.zip_code,
        },
        relation: this.relation,
        phones_associated: [
          {
          phone_number: this.number,
          description: this.number_description,
          },
        ],
      };

      const fileId = this.authService.getProfileFileId();

      this.http.put(`http://v.claimcenter.com:8000/api/insured_clients/${fileId}/`, insuranceData, { headers }).subscribe(
        (response) => {
          console.log('Seguro editado exitosamente', response);
          this.showWarningMessage('Seguro editado exitosamente');
          this.editEnabled = false;
        },
        (error) => {
          console.error('Error al editar el Seguro', error);
          this.showWarningMessage('Error al editar el Seguro');
        }
      );
    } else {
      console.error('No hay token de autorización disponible.');
      this.showWarningMessage('Su sesión ha expirado');
    }
  }

}
