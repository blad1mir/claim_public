import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { BackendService } from 'src/app/core/services/backend.service';
import { environment } from 'src/environments/environment';

interface Enterprise {
  enterprise_id: number;
  name: string;
}
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
  email_associated: string = '';
  email_description: string = '';
  country: string = '';
  state: string = '';
  city: string = '';
  street: string = '';
  zip_code: string = '';
  //claims_handler: string = '';
  first_role: string = 'viewer';
  second_role: string = 'external_user';

  create_account: boolean = false;

  categories: any[] = [];
  roles: any[] = [];

  selectedEnterprise: string = '';
  enterprises: { enterprise_id: string; name: string }[] = [];

  isContactInformationButtonActive: boolean = true;
  isUserInformationButtonActive: boolean = false;
  isProfessionalInformationButtonActive: boolean = false;
  isUserCheckActive: boolean = false;
  isProfessionalCategorySelected: boolean = false;



  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private backendService: BackendService,
  ) {
    this.userProfilesUrl = this.baseUrl + 'user_profiles/';

  }

  ngOnInit(): void {
    this.checkBackendConnection();
    this.fetchCategories();
    this.fetchRoles();
    this.fetchEnterprises();
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


  fetchCategories(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      this.http.get('http://v.claimcenter.com:8000/api/categories/', { headers })
        .subscribe((response: any) => {
          // Aquí asumes que la respuesta tiene un campo 'results' que contiene las categorías
          this.categories = response.results;
        }, (error) => {
          console.error('Error al obtener las categorías', error);
        });
    } else {
      console.error('No hay token de autorización disponible.');
    }
  }

  fetchRoles(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      this.http.get('http://v.claimcenter.com:8000/api/user_profiles/roles/', { headers })
        .subscribe(
          (response: any) => {
            console.log('Roles Response:', response);
            this.roles = response;
          },
          (error) => {
            console.error('Error fetching roles:', error);
          }
        );
    } else {
      console.error('No hay token de autorización disponible.');
    }
  }

  fetchEnterprises(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      this.http.get('http://v.claimcenter.com:8000/api/enterprises/', { headers })
    .subscribe((response: any) => {
      console.log('empresas Response:', response);
      this.enterprises = response.results;
    }, (error) => {
      console.error('Error al obtener las empresas', error);
    });
    } else {
      console.error('No hay token de autorización disponible.');
    }
  }


  createUser(): void {
    /*console.log("prueba de enterprise:", this.enterprise)
    console.log("username:", this.username,
"nombre",this.first_name,
"apellido",this.last_name,
"correo",this.email,
"contraseña",this.password,
"contraseña 1",this.password_confirmation,
"segundo apellido",this.second_last_name,
"segundo nombre",this.middle_name,
"informacion",this.profile_info,
"empresa",this.enterprise,
"documento legal",this.legal_document,
"privacidad",this.is_private,
"banco",this.bank_name,
"numero de cuenta",this.account_number,
"banco abre",this.bank_abbr,
"numero de contador",this.accounting_code,
"categoria 1",this.first_category,
"categoria 2",this.second_category,
"categoria 3",this.third_category,
"numero",this.phone_number,
"descripcion numero",this.phone_description,
"correo ",this.email_associated,
"correo desc",this.email_description,
"pais",this.country,
"estado",this.state,
"ciudad",this.city,
"calle",this.street,
"codigo",this.zip_code,
"role 1",this.first_role,
"role 2",this.second_role,)
    /*if (!this.first_name || !this.last_name || !this.email|| !this.enterprise || !this.legal_document|| !this.country  || !this.state  || !this.city  || !this.street  || !this.zip_code)
    {
      this.showWarningMessage('Por favor, complete todos los campos.'); return;
    }*/
    const authToken = this.authService.getAuthToken();
    if(this.isUserCheckActive === false){
      this.username = this.first_name + this.legal_document;
      this.password = this.first_name + this.legal_document;
      this.password_confirmation = this.first_name + this.legal_document;
    }

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
          //claims_handler: this.claims_handler,
        },
        roles: [
          this.first_role,
          this.second_role
        ]
      };

      this.http.post(this.userProfilesUrl, userData, { headers }).subscribe(
        (response) => {
          console.log('Contacto creada exitosamente', response);
          this.showWarningMessage('Contacto creada exitosamente');
        },
        (error) => {
          console.error('Error al crear la contacto', error);
          this.showWarningMessage('Llene los campos correctamente');
        }
      );
    } else {
      console.error('No hay token de autorización disponible.');
      this.showWarningMessage('Su sesión ha expirado');
    }
  }

  private showWarningMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
    });
  }

  toggleContactInformation(): void {
    this. isContactInformationButtonActive= true;
    this.isUserInformationButtonActive = false;
    this.isProfessionalInformationButtonActive = false;
  }

  toggleUserInformation(): void {
    this.isContactInformationButtonActive = false;
    this.isUserInformationButtonActive = true;
    this.isProfessionalInformationButtonActive = false;
  }

  toggleProfessionalInformation(): void {
    this.isContactInformationButtonActive = false;
    this.isUserInformationButtonActive = false;
    this.isProfessionalInformationButtonActive = true;
  }

  toggleUserCheck(): void {
    this.isUserCheckActive = this.create_account;
  }

  handleCategoryChange(): void {
    if(this.second_category === 2)
    {
      this.isProfessionalCategorySelected = true;
    } else {
      this.isProfessionalCategorySelected = false;
    }
  }


}
