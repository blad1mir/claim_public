import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../core/services/auth.service';

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
}
