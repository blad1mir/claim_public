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
  userProfiles: any;
  searchInput: string = '';


  constructor(
    private communicationService: CommunicationService,
    private selectedUserService: SelectedUserService, // Inyecta el servicio
    public service: HttpClientService,
    public http: HttpClient
  ) {
    this.http.get(this.baseUrl + 'user_profiles/').subscribe((data) => {
      this.userProfiles = data;
      console.log(data);
    });
  }

  ngOnInit(): void {}

  onSearchClick(): void {
    const searchUrl = this.baseUrl + 'user_profiles/' + '?search=' + this.searchInput;
    this.http.get(searchUrl).subscribe((data) => {
      this.userProfiles = data;
      console.log(data);
    });
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
      actualNumber = Math.floor(offset / 10);
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
