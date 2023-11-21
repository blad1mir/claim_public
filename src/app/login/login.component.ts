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
      console.log(response);
    } catch (error) {
      console.error('Error en la solicitud de inicio de sesión', error);
    }
  }

}
