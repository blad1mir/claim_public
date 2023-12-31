import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../communication.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from 'src/app/core/http/data-layer/http-client.service';
import { environment } from 'src/environments/environment';
import { SelectedUserService } from './selected-user.service'; // Ajusta la ruta según tu estructura
import { BackendService } from 'src/app/core/services/backend.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  private readonly baseUrl: string = environment.apiUrl;
  private readonly userProfilesUrl: string;
  userProfiles: any;
  searchInput: string = '';
  usernameInput: string = "";
  nombreInput: string = "";
  apellidoInput: string = "";
  segundoNombreInput: string = "";
  segundoApellidoInput: string = "";
  emailInput: string = "";
  telefonoInput: string = "";
  documentoLegalInput: string = "";

  lastClickedCategory: string | boolean = false;
  open: boolean = false;
  checkboxSelections: { [key: string]: boolean } = {};
  isBuscarButtonActive: boolean = true;
  isBuscarAvzButtonActive: boolean = false;

  isContactMode: boolean = false;

  showErrorSpinner: boolean = false;
  errorTimer: any;
  hasInitialLoadCompleted: boolean = false;
  loading: boolean = true;

  toggleDropdown() {
    this.open = !this.open;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  toggleCheckbox(option: string) {
    this.checkboxSelections[option] = !this.checkboxSelections[option];
  }

  closeDropdown() {
    this.open = false;
  }

  constructor(
    private communicationService: CommunicationService,
    private selectedUserService: SelectedUserService,
    public service: HttpClientService,
    public http: HttpClient,
    private backendService: BackendService,
    private snackBar: MatSnackBar,
  ) {
    this.userProfilesUrl = this.baseUrl + 'user_profiles/';

    this.communicationService.userClicked$.subscribe((category: string | boolean) => {
      this.lastClickedCategory = category;
      this.handleUserClicked(category);
    });
  }

  ngOnInit(): void {
    this.checkBackendConnection();
  }

  ngOnDestroy(): void {
    if (this.errorTimer) {
      clearTimeout(this.errorTimer);
    }
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

  onSearchClick(): void {
    this.toggleBuscarButton();

    if (typeof this.lastClickedCategory === 'string') {
      const categoryQuery = this.getCategoryQuery(this.lastClickedCategory);

      let searchUrl = `${this.userProfilesUrl}?profile__categories__category=${categoryQuery}`;
      searchUrl += `&search=${this.searchInput}`;

      console.log(searchUrl);

      this.http.get(searchUrl).subscribe((data) => {
        this.userProfiles = data;
        console.log(data);
      });
    } else {
      console.error('No se pudo obtener la categoría para la búsqueda.');
    }
  }

  onSearchAvzClick(): void {
    this.toggleBuscarButton();

      let searchUrl = `${this.userProfilesUrl}`;

      searchUrl += `?username=${this.getUsernameInput()}&first_name=${this.getNombreInput()}&last_name=${this.getApellidoInput()}&email=${this.getEmailInput()}&profile__middle_name=${this.getSegundoNombreInput()}&profile__phones_associated__phone_number=${this.getTelefonoInput()}&profile__legal_document=${this.getDocumentoLegalInput()}&dropdown/?is_active=0`;

      console.log(searchUrl);

      this.http.get(searchUrl).subscribe((data) => {
        this.userProfiles = data;
        console.log(data);
      });

  }

  getDocumentoLegalInput(): string {
    return this.documentoLegalInput || "";
  }

  getTelefonoInput(): string {
    return this.telefonoInput || "";
  }

  getSegundoNombreInput(): string {
    return this.segundoNombreInput || "";
  }


  getEmailInput(): string {
    return this.emailInput || "";
  }

  getApellidoInput(): string {
    return this.apellidoInput || "";
  }

  getNombreInput(): string {
    return this.nombreInput || "";
  }

  getUsernameInput(): string {
    return this.usernameInput || "";
  }

  onCheckboxChange(selectedCategory: string): void {
    Object.keys(this.checkboxSelections).forEach((category) => {
      if (category !== selectedCategory) {
        this.checkboxSelections[category] = false;
      }
    });
  }

  private handleUserClicked(category: string | boolean): void {
    let url: string;

    if (typeof category === 'string') {
      const categoryQuery = this.getCategoryQuery(category);

      if (categoryQuery === 'Contacto') {
        this.isContactMode = true;
        url = `${this.userProfilesUrl}dropdown/?is_active=0`;
      } else {
        this.isContactMode = false;
        this.isBuscarButtonActive = true;
        url = `${this.userProfilesUrl}?profile__categories__category=${categoryQuery}`;
      }
    } else {
      this.isContactMode = false;
      url = `${this.userProfilesUrl}dropdown/?is_active=1`;
    }

    this.showErrorSpinner = true;
    this.fetchUserProfiles(url);
  }

  private fetchUserProfiles(url: string, retryCount: number = 0): void {
    this.loading = true;
    this.http.get(url).subscribe(
      (data) => {
        this.userProfiles = data;
        console.log(data);
        // Reinicia la bandera de carga
        this.loading = false;
        // Reinicia la bandera de error y el temporizador
        this.showErrorSpinner = false;
        if (this.errorTimer) {
          clearTimeout(this.errorTimer);
        }
      },
      (error) => {
        // Muestra el spinner y programa un temporizador para intentar de nuevo (hasta 3 intentos)
        if (retryCount < 3) {
          this.errorTimer = setTimeout(() => {
            this.fetchUserProfiles(url, retryCount + 1);
          }, 500);
        } else {
          console.error('Error en la obtención de perfiles de usuario después de varios intentos.', error);
          this.showErrorSpinner = false; // Puedes manejar este caso según tus necesidades
          // Reinicia la bandera de carga
          this.loading = false;
        }
      }
    );
  }

  private getCategoryQuery(category: string): string {
    switch (category) {
      case 'person':
        return '';
      case 'proveedor':
        return 'Proveedor';
      case 'cliente':
        return 'Cliente Particular';
      case 'profesional':
        return 'Profesional';
        case 'prescriptor':
        return 'Prescriptor';
        case 'tramitador':
        return 'Tramitador Compañía';
        case 'contacto':
        return 'Contacto';
      default:
        return 'persona';
    }
  }



  onSelectUserProfile(id: string): void {
    this.selectedUserService.setSelectedUserid(id);
    this.onUserProfileClick();
  }

  onUserProfileClick() {
    this.communicationService.emitUserProfileClicked();
  }

  onCreateUserClick() {
    this.communicationService.emitCreateUserClicked();
  }

  onEnableUserClick() {
    this.communicationService.emitUserEditClicked();
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
    // Extrae el valor de 'offset' de la URL
    const match = /offset=(\d+)/.exec(url);
    return match ? +match[1] : 0;
  }

  toggleBuscarButton(): void {
    this.isBuscarButtonActive = true;
    this.isBuscarAvzButtonActive = false;
  }

  toggleBuscarAvzButton(): void {
    this.isBuscarButtonActive = false;
    this.isBuscarAvzButtonActive = true;
  }


  private showWarningMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
    });
  }
}
