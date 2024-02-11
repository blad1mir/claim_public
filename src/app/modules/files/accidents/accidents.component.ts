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

  claimcauseTypeChoices: { name: string, type: string }[] = [];

  accident: any[]=[];

  editEnabled: boolean = false;

  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchAccident();
    this.fetchClaimcauseTypeChoices();
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

  onEditEnabledClicked(){
    this.editEnabled = true;
  }

  updateAccident(): void {
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

      const fileId = this.authService.getProfileFileId();

      this.http.put(`http://v.claimcenter.com:8000/api/accidents/${fileId}/`, accidentData, { headers }).subscribe(
        (response) => {
          console.log('Accidente editado exitosamente', response);
          this.showWarningMessage('Accidente editado exitosamente');
          this.editEnabled = false;

        },
        (error) => {
          console.error('Error al editar el accidente', error);
          this.showWarningMessage('Error al editar el accidente');
        }
      );
    } else {
      console.error('No hay token de autorización disponible.');
      this.showWarningMessage('Su sesión ha expirado');
    }
  }

}
