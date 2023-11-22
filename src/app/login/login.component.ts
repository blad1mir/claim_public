import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../core/http/data-layer/http-client.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  apiUrl1= 'http://v.claimcenter.com:8000/api/';
  apiUrl2= '91.107.215.150:8000/api/';

  user = {
    username : 'blad',
    password : '28A3_0005'
  }
  constructor(
    public service: HttpClientService,public http: HttpClient
  ) { 
    let res1 = this.http.post(this.apiUrl1 + 'user_profiles/login/', JSON.stringify(this.user));
    console.log(res1)

    let res2 = this.http.post(this.apiUrl2 + 'user_profiles/login/', JSON.stringify(this.user));
    console.log(res2)
  }

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
