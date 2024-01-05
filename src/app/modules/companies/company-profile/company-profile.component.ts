import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/communication.service';
import { HttpClientService } from 'src/app/core/http/data-layer/http-client.service';
import { environment } from 'src/environments/environment';
import { SelectedCompanyService } from '../selected-company.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  private readonly baseUrl: string = environment.apiUrl;
  companyProfiles: any;
  userProfiles: any;
  selectedCompanyid: string | null = null;
  private selectedCompanySubscription: Subscription;
  isEmployeeButtonActive: boolean = true;
  isInputDisabled: boolean = true;
  updatedName: string = '';
  updatedBankName: string = '';
  updatedEmail: string = '';
  updatedlegal_document: string = '';

  constructor(
    private communicationService: CommunicationService,
    public service: HttpClientService,
    private selectedCompanyService: SelectedCompanyService,
    public http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    ) {
      this.selectedCompanySubscription = this.selectedCompanyService.selectedCompanyid$.subscribe((companyid) => {
        this.selectedCompanyid = companyid;

        const url = this.selectedCompanyid
          ? `${this.baseUrl}enterprises/${this.selectedCompanyid}/`
          : `${this.baseUrl}enterprises/`;

        this.http.get(url).subscribe((data) => {
          console.log(url)
          this.companyProfiles = data;
          console.log(data);

          // Realizar el segundo llamado después de obtener la información de la empresa
          //const companyNameForSearch = this.companyProfiles?.name?.replace(/\s+/g, '+') || '';
          const searchUrl = `${this.baseUrl}user_profiles/?profile__enterprise__name${this.companyProfiles?.name}/`;
          this.http.get(searchUrl).subscribe((userData) => {
            console.log(searchUrl);
            console.log(userData);
            this.userProfiles = userData;
            // Puedes hacer algo con la información de los perfiles de usuario aquí
          });
        });
      });
    }


  ngOnInit(): void {
  }

  onCompanyEditClick() {
    //this.communicationService.emitCompanyEditClicked();
  }

  ngOnDestroy(): void {
    // Desuscribe al componente de los cambios en el nombre de usuario seleccionado
    this.selectedCompanySubscription.unsubscribe();
  }

  toggleEmployeeButton(activate: boolean): void {
    this.isEmployeeButtonActive = activate;
  }

  paginationNumber(): number  {
    let actualNumber;

    if (this.userProfiles.next) {
      const offset = this.extractOffset(this.userProfiles.next);
      actualNumber = Math.floor(offset / 10);
    } else if (this.userProfiles.previous) {
      const offset = this.extractOffset(this.userProfiles.previous);
      actualNumber = Math.floor((offset / 10)+2);
    } else {
      return 1;
    }

    return actualNumber === 0 ? 1 : actualNumber;
  }

  onNextClick(): void {
    if (this.userProfiles.next) {
      const newUrl = this.userProfiles.next;
      this.http.get(newUrl).subscribe((data) => {
        this.userProfiles = data;
        console.log(data);
      });
    }
  }

  onPreviousClick(): void {
    if (this.userProfiles.previous) {
      const newUrl = this.userProfiles.previous;
      this.http.get(newUrl).subscribe((data) => {
        this.userProfiles = data;
        console.log(data);
      });
    }
  }

  private extractOffset(url: string): number {
    const match = /offset=(\d+)/.exec(url);
    return match ? +match[1] : 0;
  }

  enableInput() {
    this.isInputDisabled = false;
  }

  disableInput() {
    this.isInputDisabled = true;
  }
  saveAndDisableInput() {
    if (!this.updatedName || !this.updatedlegal_document || !this.updatedBankName || !this.updatedEmail )
    {
      this.showWarningMessage('Por favor, complete todos los campos.');
      return;
    }
    const authToken = this.authService.getAuthToken();

    if (authToken) {
      const url = `${this.baseUrl}enterprises/${this.selectedCompanyid}/`;

      const updatedData = {
        name: this.updatedName,
        legal_document: this.updatedlegal_document,
        bank_details: {
          bank_name: this.updatedBankName,
        },
        emails_associated: [
          {
            email: this.updatedEmail,
            description: "Correo empresarial"
          }
        ],
      };

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      this.http.patch(url, updatedData, { headers }).subscribe(
        (response) => {
          console.log('Edición parcial exitosa', response);
          this.showWarningMessage('Edición exitosa');

          this.disableInput();
        },
        (error) => {
          console.error('Error en edición parcial', error);
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
