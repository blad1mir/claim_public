import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunicationService } from '../../../communication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientService } from 'src/app/core/http/data-layer/http-client.service';
import { environment } from 'src/environments/environment';
import { SelectedUserService } from '../selected-user.service'; // Ajusta la ruta según tu estructura
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private readonly baseUrl: string = environment.apiUrl;
  userProfiles: any;
  selectedUserid: string | null = null;
  private selectedUserSubscription: Subscription;
  isInputDisabled: boolean = true;
  updatedFirst_name: string = '';
  updatedLast_name: string = '';
  updatedUsername: string = '';
  updatedMiddle_name: string = '';
  updatedSecond_last_name: string = '';
  updatedPhone_number: string = '';
  updatedEnterprise: string = '';
  updatedEmail: string = '';
  updatedlegal_document: string = '';

  initializeUserData(): void {
    // Verifica si userProfiles y selectedUserid están definidos
    if (this.userProfiles && this.selectedUserid) {
      this.updatedFirst_name = this.userProfiles.user?.first_name || '';
      this.updatedLast_name = this.userProfiles.user?.last_name || '';
      this.updatedUsername = this.userProfiles.user?.username || '';
      this.updatedMiddle_name = this.userProfiles.profile?.middle_name || '';
      this.updatedSecond_last_name = this.userProfiles.profile?.second_last_name || '';
      this.updatedPhone_number = this.userProfiles.profile?.phones_associated[0]?.phone_number || '';
      this.updatedEnterprise = this.userProfiles.profile?.enterprise || '';
      this.updatedEmail = this.userProfiles.user?.email || '';
      this.updatedlegal_document = this.userProfiles.profile?.legal_document || '';
    }
  }

  constructor(
    private communicationService: CommunicationService,
    private selectedUserService: SelectedUserService,
    public service: HttpClientService,
    public http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    // Suscribe a los cambios en el nombre de usuario seleccionado
    this.selectedUserSubscription = this.selectedUserService.selectedUserid$.subscribe((userid) => {
      this.selectedUserid = userid;
      // Construye la URL usando el selectedUserid
      const url = this.selectedUserid
        ? `${this.baseUrl}user_profiles/${this.selectedUserid}/`
        : `${this.baseUrl}user_profiles/`;

      this.http.get(url).subscribe((data) => {
        this.userProfiles = data;
        this.initializeUserData();
        console.log(data);
      });
    });
  }

  ngOnInit(): void {
    this.updatedFirst_name= this.userProfiles.user?.first_name || '';
    this.updatedLast_name= this.userProfiles.user?.last_name || '';
    this.updatedUsername= this.userProfiles.user?.username || '';
    this.updatedMiddle_name= this.userProfiles.profile?.middle_name || '';
    this.updatedSecond_last_name= this.userProfiles.profile?.second_last_name || '';
    this.updatedPhone_number= this.userProfiles.profile?.phones_associated[0]?.phone_number || '';
    this.updatedEnterprise= this.userProfiles.profile?.enterprise || '';
    this.updatedEmail= this.userProfiles.user?.email || '';
    this.updatedlegal_document= this.userProfiles.profile?.legal_document || '';
    console.log(this.updatedLast_name);
  }

  onUserEditClick() {
    this.communicationService.emitUserEditClicked();
  }

  ngOnDestroy(): void {
    // Desuscribe al componente de los cambios en el nombre de usuario seleccionado
    this.selectedUserSubscription.unsubscribe();
  }

  enableInput() {
    this.isInputDisabled = false;
  }

  disableInput() {
    this.isInputDisabled = true;
  }
  saveAndDisableInput() {
    if (!this.updatedFirst_name || !this.updatedLast_name || !this.updatedEmail || !this.updatedUsername || !this.updatedMiddle_name || !this.updatedSecond_last_name || !this.updatedlegal_document || !this.updatedPhone_number )
    {
      this.showWarningMessage('Por favor, complete todos los campos.');
      return;
    }
    const authToken = this.authService.getAuthToken();

    if (authToken) {
      const url = `${this.baseUrl}user_profiles/${this.selectedUserid}/`;

      const updatedData = {
        user: {
          first_name: this.updatedFirst_name,
          last_name:this.updatedLast_name,
          email: this.updatedEmail,
          username: this.updatedUsername,
        },
        profile:{
          middle_name: this.updatedMiddle_name,
          second_last_name: this.updatedSecond_last_name,
          legal_document: this.updatedlegal_document,
          phones_associated:[
            {
              phone_number: this.updatedPhone_number,
            }
          ]
        }
      };

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      this.http.patch(url, updatedData, { headers }).subscribe(
        (response) => {
          console.log('Edición parcial exitosa', response);
          this.showWarningMessage('Edición exitosa');

          this.disableInput();
        },
        (error) => {
          console.error('Error en edición parcial', error);
          console.error('Detalles del error:', error.error);
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
}
