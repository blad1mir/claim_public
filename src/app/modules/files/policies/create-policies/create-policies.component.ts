import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/communication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-policies',
  templateUrl: './create-policies.component.html',
  styleUrls: ['./create-policies.component.scss', '../../.././users/user-create/user-create.component.scss',]
})
export class CreatePoliciesComponent implements OnInit {

  file_id: string = '10001';
  policy: string = '';
  effect_date: string = '';
  branch_type: string = 'COobrcivil';
  PolicyBranchTypeOptions: { name: string, type: string }[] = [];

  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchPolicyBranchTypeOptions();
  }

  oncreateHomeAddressClicked() {
    this.communicationService.emitCreateHomeAddressClicked();
  }

  private showWarningMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
    });
  }

  private fetchPolicyBranchTypeOptions(): void {
    const PolicyBranchTypeOptions = this.authService.getPolicyBranchTypeOptions();
    this.PolicyBranchTypeOptions = PolicyBranchTypeOptions;
    console.log(this.PolicyBranchTypeOptions);
  }

  createPolicy(): void {
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
        policy:this.policy,
        effect_date:this.effect_date,
        branch_type:this.branch_type,
      };

      this.http.post('http://v.claimcenter.com:8000/api/policies/', policyData, { headers }).subscribe(
        (response) => {
          console.log('Poliza creada exitosamente', response);
          this.showWarningMessage('Poliza creada exitosamente');
          this.authService.setBranchType((response as any).branch_type);
          this.oncreateHomeAddressClicked();
        },
        (error) => {
          console.error('Error al crear la Poliza', error);
          this.showWarningMessage('Error al crear la Poliza');
        }
      );

      //this.oncreateHomeAddressClicked();

    }
    else
    {
      console.error('No hay token de autorización disponible.');
      this.showWarningMessage('Su sesión ha expirado');
    }

  }
}
