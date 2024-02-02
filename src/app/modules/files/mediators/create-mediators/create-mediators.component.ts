import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/communication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-mediators',
  templateUrl: './create-mediators.component.html',
  styleUrls: ['./create-mediators.component.scss', '../../.././users/user-create/user-create.component.scss',]
})
export class CreateMediatorsComponent implements OnInit {

  file_id: string = '10001';
  name: string = '';
  person: string = '';
  address: string = '';
  email: string = '';
  legal_document: string = '';
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


  oncreateCommunitiesClicked() {
    this.communicationService.emitCreateCommunitiesClicked();
  }

  private showWarningMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
    });
  }

  createMediator(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const mediatorData = {
        file_id:this.authService.getFileId(),
        name:this.name,
        person:this.person,
        address:this.address,
        email:this.email,
        legal_document:this.legal_document,
        phones_associated:[
          {
            phone_number:this.phone_number,
            description:this.description,
          },
        ],
      };

      this.http.post('http://v.claimcenter.com:8000/api/mediators/', mediatorData, { headers }).subscribe(
        (response) => {
          console.log('Mediador creado exitosamente', response);
          this.showWarningMessage('Mediador creado exitosamente');
          this.oncreateCommunitiesClicked();
        },
        (error) => {
          console.error('Error al crear el Mediador', error);
          this.showWarningMessage('Error al crear el Mediador');
        }
      );
    } else {
      console.error('No hay token de autorización disponible.');
      this.showWarningMessage('Su sesión ha expirado');
    }
  }
}
