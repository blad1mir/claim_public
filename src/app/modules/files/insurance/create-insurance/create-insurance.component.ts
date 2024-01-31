import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/communication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-insurance',
  templateUrl: './create-insurance.component.html',
  styleUrls: ['./create-insurance.component.scss', '../../.././users/user-create/user-create.component.scss',]
})
export class CreateInsuranceComponent implements OnInit {

  file_id: string = '10001';
  name: string = '';
  email: string = '';
  //contacts_token: string = '';
  legal_document: string = '';
  country: string = '';
  state: string = '';
  city: string = '';
  street: string = '';
  zip_code: string = '';
  relation: string = '';
  phone_number: string = '';
  description: string = '';

  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }


  onCreatePoliciesClicked() {
    this.communicationService.emitCreatePoliciesClicked();
  }

  private showWarningMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
    });
  }

  createInsurance(): void {
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
          phone_number: this.phone_number,
          description: this.description,
          },
        ],
      };

      this.http.post('http://v.claimcenter.com:8000/api/insured_clients/', insuranceData, { headers }).subscribe(
        (response) => {
          console.log('Seguro creado exitosamente', response);
          this.showWarningMessage('Seguro creado exitosamente');
          this.onCreatePoliciesClicked();
        },
        (error) => {
          console.error('Error al crear el Seguro', error);
          this.showWarningMessage('Error al crear el Seguro');
        }
      );
    } else {
      console.error('No hay token de autorización disponible.');
      this.showWarningMessage('Su sesión ha expirado');
    }
  }
}
