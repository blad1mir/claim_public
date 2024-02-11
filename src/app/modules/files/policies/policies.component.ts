import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommunicationService } from 'src/app/communication.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss', '.././files.component.scss']
})
export class PoliciesComponent implements OnInit {

  policy_name: string = '';
  branch_type: string = '';
  effect_date: string = '';
  policy: any[] = [];
  PolicyBranchTypeOptions: { name: string, type: string }[] = [];

  editEnabled: boolean = false;

  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchPolicy();
    this.fetchPolicyBranchTypeOptions();
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

  private fetchPolicyBranchTypeOptions(): void {
    const PolicyBranchTypeOptions = this.authService.getPolicyBranchTypeOptions();
    this.PolicyBranchTypeOptions = PolicyBranchTypeOptions;
    console.log(this.PolicyBranchTypeOptions);
  }

  fetchPolicy(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const fileId = this.authService.getProfileFileId();

      this.http.get(`http://v.claimcenter.com:8000/api/policies/${fileId}/`, { headers })
        .subscribe(
          (response: any) => {
            console.log('policy:', response);
            this.policy = response;
            this.policy_name = response.policy;
            this.branch_type = response.branch_type;
            this.effect_date = this.formatDateWithoutTime(response.effect_date);
          },
          (error) => {
            console.error('Error fetching policy:', error);
          }
        );
    } else {
      console.error('No hay token de autorización disponible.');
    }
  }

  updatePolicy(): void {
    if (!this.policy || !this.effect_date || !this.branch_type ){
      this.showWarningMessage('Por favor, complete todos los campos.'); return;
    }

    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const policyData = {
        file_id:this.authService.getFileId(),
        policy:this.policy_name,
        effect_date:this.effect_date,
        branch_type:this.branch_type,
      };

      const fileId = this.authService.getProfileFileId();

      this.http.put(`http://v.claimcenter.com:8000/api/policies/${fileId}/`, policyData, { headers }).subscribe(
        (response) => {
          console.log('Poliza editada exitosamente', response);
          this.showWarningMessage('Poliza editada exitosamente');
          this.editEnabled = false;
        },
        (error) => {
          console.error('Error al editar la Poliza', error);
          this.showWarningMessage('Error al editar la Poliza');
        }
      );

    }
    else
    {
      console.error('No hay token de autorización disponible.');
      this.showWarningMessage('Su sesión ha expirado');
    }

  }

  formatDateWithoutTime(date: string): string {
    const dateParts = date.slice(0, -10).split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    return formattedDate;
  }

  private showWarningMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
    });
  }

}
