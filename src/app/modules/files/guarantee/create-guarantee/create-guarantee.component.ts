import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/communication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-guarantee',
  templateUrl: './create-guarantee.component.html',
  styleUrls: ['./create-guarantee.component.scss', '../../.././users/user-create/user-create.component.scss',]
})
export class CreateGuaranteeComponent implements OnInit {

  guarantee_name: string = '';
  guarantee_capital: number = 0;
  guarantee_code: string = '';
  capital_code: string = '';
  segurcaixa_code: string = '';
  guarantee: number = 0;

  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }


  oncreateGuaranteeClicked() {
    this.communicationService.emitCreateGuaranteeClicked();
  }

  private showWarningMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
    });
  }

  createGuarantee(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const guaranteeData = {
        guarantee_name:this.guarantee_name,
        guarantee_capital:this.guarantee_capital,
        guarantee_code:this.guarantee_code,
        capital_code:this.capital_code,
        segurcaixa_code:this.segurcaixa_code,
        guarantee:this.guarantee,
      };

      this.http.post('http://v.claimcenter.com:8000/api/guarantee/', guaranteeData, { headers }).subscribe(
        (response) => {
          console.log('Garantía creada exitosamente', response);
          this.showWarningMessage('Garantía creada exitosamente');
          this.oncreateGuaranteeClicked();
        },
        (error) => {
          console.error('Error al crear la Garantía', error);
          this.showWarningMessage('Error al crear la Garantía');
        }
      );
    } else {
      console.error('No hay token de autorización disponible.');
      this.showWarningMessage('Su sesión ha expirado');
    }
  }
}
