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
  lastClickedCategory: string | boolean = false;
  open: boolean = false;
  checkboxSelections: { [key: string]: boolean } = {};

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
    this.userProfilesUrl = this.baseUrl + 'user_profiles/';  // Inicializa la variable aquí

    this.communicationService.userClicked$.subscribe((category: string | boolean) => {
      this.lastClickedCategory = category;
      this.handleUserClicked(category);
    });
  }

  ngOnInit(): void {}

  onSearchClick(): void {
    if (typeof this.lastClickedCategory === 'string') {
      const categoryQuery = this.getCategoryQuery(this.lastClickedCategory);

      let searchUrl = `${this.userProfilesUrl}?profile__categories__category=${categoryQuery}`;

      if (this.checkboxSelections['username']) searchUrl += `&username=${this.searchInput}`;
      if (this.checkboxSelections['nombre']) searchUrl += `&first_name=${this.searchInput}`;
      if (this.checkboxSelections['apellido']) searchUrl += `&last_name=${this.searchInput}`;
      if (this.checkboxSelections['email']) searchUrl += `&email=${this.searchInput}`;
      if (this.checkboxSelections['segundo nombre']) searchUrl += `&profile__middle_name=${this.searchInput}`;
      if (this.checkboxSelections['telefono']) searchUrl += `&profile__phones_associated__phone_number=${this.searchInput}`;
      if (this.checkboxSelections['documento legal']) searchUrl += `&profile__legal_document=${this.searchInput}`;


      console.log(searchUrl);

      this.http.get(searchUrl).subscribe((data) => {
        this.userProfiles = data;
        console.log(data);
      });
    } else {
      console.error('No se pudo obtener la categoría para la búsqueda.');
    }
  }

  onCheckboxChange(selectedCategory: string): void {
    Object.keys(this.checkboxSelections).forEach((category) => {
      if (category !== selectedCategory) {
        this.checkboxSelections[category] = false;
      }
    });
  }

  private handleUserClicked(category: string | boolean): void {
    if (typeof category === 'string') {
      const categoryQuery = this.getCategoryQuery(category);
      const url = `${this.userProfilesUrl}?profile__categories__category=${categoryQuery}`;
      console.log(url);
      this.http.get(url).subscribe((data) => {
        this.userProfiles = data;
        console.log(data);
      });
    }
  }

  private getCategoryQuery(category: string): string {
    switch (category) {
      case 'persona':
        return 'Persona';
      case 'cliente':
        return 'Cliente';
      case 'profesional':
        return 'Profesional';
      default:
        return 'personas';
    }
  }

  onSelectUserProfile(username: string): void {
    this.selectedUserService.setSelectedUsername(username); // Establece el usuario seleccionado
    this.onUserProfileClick();
  }

  onUserProfileClick() {
    this.communicationService.emitUserProfileClicked();
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
}
