import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/communication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-home-address',
  templateUrl: './create-home-address.component.html',
  styleUrls: ['./create-home-address.component.scss', '../../.././users/user-create/user-create.component.scss',]
})
export class CreateHomeAddressComponent implements OnInit {

  file_id: string = '10001';
  country: string = '';
  state: string = '';
  city: string = '';
  street: string = '';
  zip_code: string = '';

  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    console.log(this.authService.getAssigment(), " / ", this.authService.getBranchType())
  }

  /*onCreateMediatorsClicked() {
    this.communicationService.emitCreateMediatorsClicked();
  }*/

  oncreateCommunitiesClicked() {
    this.communicationService.emitCreateCommunitiesClicked();
  }

  private showWarningMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
    });
  }

  oncreateAccidentsClicked() {
    this.communicationService.emitCreateAccidentsClicked();
  }




  createHomeAddress(): void {
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

      this.http.post('http://v.claimcenter.com:8000/api/home_address/', homeAddressData, { headers }).subscribe(
        (response) => {
          console.log('Vivienda creada exitosamente', response);
          this.showWarningMessage('Vivienda creada exitosamente');
          if((this.authService.getAssigment() === 'SegurCaixa, S.A.') && (this.authService.getBranchType() === "MPedifcomu")){
            this.oncreateCommunitiesClicked();
          } else {
            this.oncreateAccidentsClicked();
          }

        },
        (error) => {
          console.error('Error al crear la Vivienda', error);
          this.showWarningMessage('Error al crear la Vivienda');
        }
      );
    } else {
      console.error('No hay token de autorización disponible.');
      this.showWarningMessage('Su sesión ha expirado');
    }
  }
}
