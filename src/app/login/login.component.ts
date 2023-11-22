import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../core/http/data-layer/http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public service: HttpClientService,
  ) { }

  ngOnInit(): void {
    this.login();
  }

  async login() {
    const username = 'root';
    const password = '28A3_0005';

    try {
      const response = await this.service.post('user_profiles/login/', { username, password });

      if (response !== undefined) {
        console.log(response);
        // Aquí puedes manejar la respuesta como sea necesario
      } else {
        console.error('Respuesta indefinida. Manejar este caso.');
      }
    } catch (error) {
      console.error('Error en la solicitud de inicio de sesión', error);
      // Manejar errores aquí
    }
  }

}
