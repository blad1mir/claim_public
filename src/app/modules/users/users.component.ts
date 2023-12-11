import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../communication.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from 'src/app/core/http/data-layer/http-client.service';
import { environment } from 'src/environments/environment';
import { SelectedUserService } from './selected-user.service'; // Ajusta la ruta según tu estructura
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

  isContactMode: boolean = false;

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
    public http: HttpClient
  ) {
    this.userProfilesUrl = this.baseUrl + 'user_profiles/';

    this.communicationService.userClicked$.subscribe((category: string | boolean) => {
      this.lastClickedCategory = category;
      this.handleUserClicked(category);
    });
  }

  ngOnInit(): void {}

  onSearchClick(): void {
    this.toggleBuscarButton(true);

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
    this.toggleBuscarButton(true);

    if (typeof this.lastClickedCategory === 'string') {
      const categoryQuery = this.getCategoryQuery(this.lastClickedCategory);

      let searchUrl = `${this.userProfilesUrl}?profile__categories__category=${categoryQuery}`;

      searchUrl += `&username=${this.getUsernameInput()}&first_name=${this.getNombreInput()}&last_name=${this.getApellidoInput()}&email=${this.getEmailInput()}&profile__middle_name=${this.getSegundoNombreInput()}&profile__phones_associated__phone_number=${this.getTelefonoInput()}&profile__legal_document=${this.getDocumentoLegalInput()}`;

      console.log(searchUrl);

      this.http.get(searchUrl).subscribe((data) => {
        this.userProfiles = data;
        console.log(data);
      });
    } else {
      console.error('No se pudo obtener la categoría para la búsqueda.');
    }
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
        url = `${this.userProfilesUrl}?profile__categories__category=${categoryQuery}`;
      }
    } else {
      this.isContactMode = false;
      url = `${this.userProfilesUrl}dropdown/?is_active=1`;
    }

    this.fetchUserProfiles(url);
  }

  private fetchUserProfiles(url: string): void {
    this.http.get(url).subscribe((data) => {
      this.userProfiles = data;
      console.log(data);
    });
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

  toggleBuscarButton(activate: boolean): void {
    this.isBuscarButtonActive = activate;
  }
}
