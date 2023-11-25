import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private readonly baseUrl: string = environment.apiUrl;
  public username: string = '';
  public password: string = '';

  constructor(public http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  submitLoginForm() {
    this.http.post<any>(this.baseUrl + 'user_profiles/login/', { username: this.username, password: this.password })
      .subscribe(
        (response) => {
          console.log(response);
          if (response && (response.message == "Inicio de Sesion Existoso")) {
            this.router.navigate(['/records']);
          } else {
            console.error('Credenciales incorrectas. Manejar este caso.');
          }
        },
        (error) => {
          console.error('Error en la solicitud de inicio de sesión', error);
          // Manejar errores aquí
        }
      );
  }
}
