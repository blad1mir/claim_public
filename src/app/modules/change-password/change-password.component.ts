import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { BackendService } from 'src/app/core/services/backend.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  private readonly baseUrl: string = environment.apiUrl;

  old_password: string = '';
  new_password: string = '';
  new_password_confirmation: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
  }

  changePassword(): void {
    const authToken = this.authService.getAuthToken();
    const userId = this.authService.getId();

    if (authToken && userId) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const changePasswordData = {
        password: this.new_password,
        password_confirmation: this.new_password_confirmation
      };

      const endpoint = `${this.baseUrl}user_profiles/${userId}/enable_user/`;

      this.http.put(endpoint, changePasswordData, { headers })
        .subscribe(
          (response) => {
            // Manejar la respuesta exitosa aquí
            console.log('Contraseña cambiada con éxito:', response);
            this.snackBar.open('Contraseña cambiada con éxito', 'Cerrar', { duration: 3000 });
          },
          (error) => {
            // Manejar el error aquí
            console.error('Error al cambiar la contraseña:', error);
            this.snackBar.open('Error al cambiar la contraseña', 'Cerrar', { duration: 3000 });
          }
        );
    }
  }
}
