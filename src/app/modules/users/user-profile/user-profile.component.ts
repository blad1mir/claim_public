import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunicationService } from '../../../communication.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from 'src/app/core/http/data-layer/http-client.service';
import { environment } from 'src/environments/environment';
import { SelectedUserService } from '../selected-user.service'; // Ajusta la ruta según tu estructura
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private readonly baseUrl: string = environment.apiUrl;
  userProfiles: any;
  selectedUsername: string | null = null;
  private selectedUserSubscription: Subscription;

  constructor(
    private communicationService: CommunicationService,
    private selectedUserService: SelectedUserService,
    public service: HttpClientService,
    public http: HttpClient
  ) {
    // Suscribe a los cambios en el nombre de usuario seleccionado
    this.selectedUserSubscription = this.selectedUserService.selectedUsername$.subscribe((username) => {
      this.selectedUsername = username;

      // Construye la URL usando el selectedUsername
      const url = this.selectedUsername
        ? `${this.baseUrl}user_profiles/${this.selectedUsername}`
        : `${this.baseUrl}user_profiles/`;

      this.http.get(url).subscribe((data) => {
        this.userProfiles = data;
        console.log(data);
      });
    });
  }

  ngOnInit(): void {}

  onUserEditClick() {
    this.communicationService.emitUserEditClicked();
  }

  ngOnDestroy(): void {
    // Desuscribe al componente de los cambios en el nombre de usuario seleccionado
    this.selectedUserSubscription.unsubscribe();
  }
}
