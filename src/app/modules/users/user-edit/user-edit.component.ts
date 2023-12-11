import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../../communication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

interface UserProfile {
  id: number;
  username: string;
  profile_id: number;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  private readonly baseUrl: string = environment.apiUrl;
  private readonly userProfilesDropdownUrl: string;
  dropdownOptions: UserProfile[] = [];
  selectedUserId: number | null = null;

  passwordInput: string = '';
  passwordConfirmationInput: string = '';

  open: boolean = false;
  checkboxSelections: { [key: string]: boolean } = {};

  toggleDropdown() {
    this.open = !this.open;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  toggleCheckbox(option: string) {
    this.checkboxSelections[option] = !this.checkboxSelections[option];
  }

  closeDropdown() {
    this.open = false;
  }

  constructor(
    private authService: AuthService,
    public http: HttpClient,
    private snackBar: MatSnackBar,
  ) {
    this.userProfilesDropdownUrl = `${this.baseUrl}user_profiles/dropdown/?is_active=0`;
  }

  ngOnInit(): void {
    // Realiza la solicitud HTTP GET al endpoint y carga las opciones del dropdown
    this.http.get<UserProfile[]>(this.userProfilesDropdownUrl).subscribe(
      (data) => {
        this.dropdownOptions = data;
      },
      (error) => {
        console.error('Error al obtener los perfiles de usuario', error);
      }
    );
  }

  onCheckboxChange(selectedCategory: string): void {
    Object.keys(this.checkboxSelections).forEach((category) => {
      if (category !== selectedCategory) {
        this.checkboxSelections[category] = false;
      }
    });
  }

  updateSelectedUserId(option: UserProfile): void {
    this.selectedUserId = option.id;
  }

  enableUser() {
    if (!this.passwordInput || !this.passwordConfirmationInput)
    {
      this.showWarningMessage('Por favor, complete todos los campos.'); return;
    }
    const authToken = this.authService.getAuthToken();

    if (authToken && this.selectedUserId) {
      const enableUserEndpoint = `${this.baseUrl}user_profiles/${this.selectedUserId}/enable_user/`;
      console.log(enableUserEndpoint);

      const requestBody = {
        password: this.passwordInput,
        password_confirmation: this.passwordConfirmationInput,
      };

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      this.http.put(enableUserEndpoint, requestBody, { headers }).subscribe(
        (response) => {
          console.log('Usuario habilitado con éxito', response);
          this.showWarningMessage('Usuario habilitado con éxito');
        },
        (error) => {
          console.error('Error al habilitar al usuario', error);
        }
      );
    } else {
      console.error('No hay token de autorización disponible o no se ha seleccionado ningún usuario.');
    }
  }

  private showWarningMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,  // Duración en milisegundos
      panelClass: ['warning-snackbar'],  // Clase CSS personalizada para el estilo del mensaje de advertencia
    });
  }
}
