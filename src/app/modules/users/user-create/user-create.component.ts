import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  private readonly baseUrl: string = environment.apiUrl;
  private readonly userProfilesUrl: string;

  username: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  second_last_name: string = '';
  middle_name: string = '';
  profile_info: string = '';
  enterprise: number = 0;
  legal_document: string = '';
  is_private: boolean = false;
  bank_name: string = '';
  account_number: string = '';
  bank_abbr: string = '';
  accounting_code: string = '';
  first_category: number = 1;
  second_category: number = 2;
  third_category: number = 3;
  phone_number: string = '';
  phone_description: string = '';
  phone_type: string = '';
  email_associated: string = '';
  email_description: string = '';
  country: string = '';
  state: string = '';
  city: string = '';
  street: string = '';
  zip_code: string = '';
  claims_handler: string = '';
  first_role: string = '';
  second_role: string = '';



  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.userProfilesUrl = this.baseUrl + 'user_profiles/';
  }

  ngOnInit(): void {
  }

  createUser(): void {
    if (!this.username || !this.first_name || !this.last_name || !this.email || !this.password || !this.password_confirmation || !this.second_last_name || !this.middle_name || !this.profile_info || !this.enterprise || !this.legal_document || !this.is_private || !this.bank_name || !this.account_number || !this.bank_abbr || !this.accounting_code || !this.first_category || !this.second_category || !this.third_category  || !this.phone_number  || !this.phone_description  || !this.phone_type  || !this.email_associated  || !this.email_description  || !this.country  || !this.state  || !this.city  || !this.street  || !this.zip_code  || !this.claims_handler  || !this.first_role  || !this.second_role )
    {
      this.showWarningMessage('Por favor, complete todos los campos.'); return;
    }
    const authToken = this.authService.getAuthToken();


    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const userData = {

        user: {
          username: this.username,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        },
        profile: {
          second_last_name: this.second_last_name,
          middle_name: this.middle_name,
          profile_info: this.profile_info,
          enterprise: this.enterprise,
          legal_document: this.legal_document,
          is_private: this.is_private,

          bank_details: {
            bank_name: this.bank_name,
            account_number: this.account_number,
            bank_abbr: this.bank_abbr,
          },
          finance_details: {
            accounting_code: this.accounting_code,
          },
          categories: [
            this.first_category,
            this.second_category,
            this.third_category,
          ],
          phones_associated: [{
            phone_number: this.phone_number,
            description: this.phone_description,
            phone_type: this.phone_type,
          }],
          emails_associated: [{
            email: this.email_associated,
            description: this.email_description,
          }],
          addresses: [{
            country: this.country,
            state: this.state,
            city: this.city,
            street: this.street,
            zip_code: this.zip_code,
          }],
          claims_handler: this.claims_handler,
        },
        roles: [
          this.first_role,
          this.second_role
        ]
      };

      this.http.post(this.userProfilesUrl, userData, { headers }).subscribe(
        (response) => {
          console.log('Contacto creada exitosamente', response);
          this.showWarningMessage('Contacto creada exitosamente.');
        },
        (error) => {
          console.error('Error al crear la contacto', error);
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
