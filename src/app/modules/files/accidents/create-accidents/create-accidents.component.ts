import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/communication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-accidents',
  templateUrl: './create-accidents.component.html',
  styleUrls: ['./create-accidents.component.scss', '../../.././users/user-create/user-create.component.scss',]
})
export class CreateAccidentsComponent implements OnInit {

  file_id: string = '10001';
  claims_handler: string = '';
  client_reference: string = '';
  handler_code: string = '';
  assistance_reference: string = '';
  claim_causes: string = '';
  ccs_company_reference: string = '';
  claimcauseTypeChoices: { name: string, type: string }[] = [];

  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void {
    this.fetchClaimcauseTypeChoices();
  }

  onFilesClick() {
    this.communicationService.emiFilesClicked();
  }

  private showWarningMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
    });
  }

  private fetchClaimcauseTypeChoices(): void {
    const claimcauseTypeChoices = this.authService.getClaimcauseTypeChoices();
    this.claimcauseTypeChoices = claimcauseTypeChoices;
    console.log(this.claimcauseTypeChoices);
  }


  createAccident(): void {
    if (!this.claims_handler || !this.client_reference || !this.handler_code || !this.assistance_reference || !this.claim_causes || !this.ccs_company_reference)
    {
      this.showWarningMessage('Por favor, complete todos los campos.'); return;
    }
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const accidentData = {
        file_id:this.authService.getFileId(),
        claims_handler:this.claims_handler,
        client_reference:this.client_reference,
        handler_code:this.handler_code,
        assistance_reference:this.assistance_reference,
        claim_causes:this.claim_causes,
        ccs_company_reference:this.ccs_company_reference,
      };

      this.http.post('http://v.claimcenter.com:8000/api/accidents/', accidentData, { headers }).subscribe(
        (response) => {
          console.log('Accidente creado exitosamente', response);
          this.showWarningMessage('Accidente creado exitosamente');
          this.onFilesClick();

        },
        (error) => {
          console.error('Error al crear el accidente', error);
          this.showWarningMessage('Error al crear el accidente');
        }
      );
    } else {
      console.error('No hay token de autorización disponible.');
      this.showWarningMessage('Su sesión ha expirado');
    }
  }

}
