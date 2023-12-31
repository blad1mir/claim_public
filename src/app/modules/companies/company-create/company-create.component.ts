import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from 'src/app/core/services/backend.service';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {

  private readonly baseUrl: string = environment.apiUrl;
  private readonly companyProfilesUrl: string;

  // Agrega propiedades para almacenar los datos de la empresa
  companyName: string = 'Prueba';
  legalDocument: string = 'J-86055199';
  isPrivate: boolean = true;
  bankName: string = 'BVVA';
  accountNumber: string = '010940058856998990009';
  bankAbbr: string = 'BVVA';
  accountingCode: string = '19734799';
  category: number = 10; // Ejemplo de categoría
  phoneNumber: string = '+584243408999';
  phoneDescription: string = 'Numero pivado';
  phoneType: string = 'private_cellphone';
  email: string = 'prueba@gmail.com';
  emailDescription: string = 'Correo empresarial';
  country: string = 'España';
  state: string = 'Madrid';
  city: string = 'Boadilla del Monte';
  street: string = 'Avenida Siglo XXI 18 1-B prueba';
  zipCode: string = '28669';
  webPageUrl: string = 'www.cliamsoft.com';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private backendService: BackendService,
  ) {
    this.companyProfilesUrl = this.baseUrl + 'enterprises/';
  }

  ngOnInit(): void {
    this.checkBackendConnection();
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

  createCompany(): void {
    if (!this.companyName || !this.legalDocument || !this.isPrivate || !this.bankName || !this.accountNumber || !this.bankAbbr || !this.accountingCode || !this.category || !this.phoneNumber || !this.phoneDescription || !this.phoneType || !this.email || !this.emailDescription || !this.country || !this.state || !this.city || !this.street || !this.zipCode || !this.webPageUrl) {
      this.showWarningMessage('Por favor, complete todos los campos.');
      return;
    }
    const authToken = this.authService.getAuthToken();


    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const companyData = {
        name: this.companyName,
        legal_document: this.legalDocument,
        is_private: this.isPrivate,
        bank_details: {
          bank_name: this.bankName,
          account_number: this.accountNumber,
          bank_abbr: this.bankAbbr,
        },
        finance_details: {
          accounting_code: this.accountingCode,
        },
        categories: [this.category],
        phones_associated: [{
          phone_number: this.phoneNumber,
          description: this.phoneDescription,
          phone_type: this.phoneType,
        }],
        emails_associated: [{
          email: this.email,
          description: this.emailDescription,
        }],
        addresses: [{
          country: this.country,
          state: this.state,
          city: this.city,
          street: this.street,
          zip_code: this.zipCode,
        }],
        web_page_url: this.webPageUrl,
      };

      this.http.post(this.companyProfilesUrl, companyData, { headers }).subscribe(
        (response) => {
          console.log('Empresa creada exitosamente', response);
          this.showWarningMessage('Empresa creada exitosamente.');

        },
        (error) => {
          console.error('Error al crear la empresa', error);
        }
      );
    } else {
      console.error('No hay token de autorización disponible.');
    }

  }

  private showWarningMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,  // Duración en milisegundos
      panelClass: ['warning-snackbar'],  // Clase CSS personalizada para el estilo del mensaje de advertencia
    });
  }

}
