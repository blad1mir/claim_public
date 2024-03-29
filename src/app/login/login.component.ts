import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../core/services/auth.service';
import { BackendService } from '../core/services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private readonly baseUrl: string = environment.apiUrl;
  public username: string = '';
  public password: string = '';

  constructor(
    public http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private backendService: BackendService,
    ) {}

  ngOnInit(): void {}

  submitLoginForm() {
    this.http.post<any>(this.baseUrl + 'user_profiles/login/', { username: this.username, password: this.password })
      .subscribe(
        (response) => {
          console.log(response);
          if (response && (response.message == "Inicio de Sesion Existoso")) {
            this.authService.setAuthTokens(response.token, response.refresh_token);
            this.authService.setVerified(response.user.is_verified);
            this.authService.setId(response.user.id);
            this.authService.setFileStatusChoices(response.initial_info.file_status_choices);
            this.authService.setFileSTypeOptions(response.initial_info.file_type_options);
            this.authService.setInsuredRelationChoises(response.initial_info.insured_relation_choices);
            this.authService.setPolicyBranchTypeOptions(response.initial_info.policy_branch_type_options);
            this.authService.setCommunityTypeOptions(response.initial_info.community_type_options);
            this.authService.setClaimcauseTypeChoices(response.initial_info.claim_cause_type_choices);

            this.router.navigate(['/records']);
          }
        },
        (error) => {
          console.error('Error en la solicitud de inicio de sesión', error);
          this.showErrorMessage('Credenciales incorrectas.');
        }
      );
  }

  logout() {
    this.authService.clearAuthTokens();
    this.router.navigate(['/login']);
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,  // Duración en milisegundos
      panelClass: ['error-snackbar'],  // Clase CSS personalizada para el estilo del mensaje de error
    });
  }

  private showWarningMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
    });
  }

  private checkBackendConnection(): void {
    this.backendService.checkConnection().subscribe(
      () => {
        console.log('Conexión con el backend establecida. Puedes realizar acciones adicionales si es necesario.');
      },
      (error) => {
        console.error('No se pudo establecer conexión con el backend.', error);
        this.showWarningMessage('No se pudo establecer conexión con el backend');
      }
    );
  }
}
