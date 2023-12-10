import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

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
  ) {
    this.companyProfilesUrl = this.baseUrl + 'enterprises/';
  }

  ngOnInit(): void {
  }

  // Método para enviar la solicitud de creación de empresa
  createCompany(): void {
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
          // Puedes realizar acciones adicionales después de la creación exitosa
        },
        (error) => {
          console.error('Error al crear la empresa', error);
        }
      );
    } else {
      console.error('No hay token de autorización disponible.');
    }
  }
}
