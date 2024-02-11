import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommunicationService } from 'src/app/communication.service';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-create-communities',
  templateUrl: './create-communities.component.html',
  styleUrls: ['./create-communities.component.scss', '../../.././users/user-create/user-create.component.scss',]
})
export class CreateCommunitiesComponent implements OnInit {

  file_id: string = '10001';
  community_code: string = '';
  recreational_facilities: boolean = false;
  occupancy_percentage: number = 0;
  number_of_houses: number = 0;
  square_meters_per_house: number = 0;
  number_of_offices: number = 0;
  square_meters_per_office: number = 0;
  above_ground_floors: number = 0;
  basement_floors: number = 0;
  adjacent_buildings_count: number = 0;
  isolated_buildings_count: number = 0;
  last_renovation_year: number = 0;
  community_type: string = '';

  communityTypeOptions: { name: string, type: string }[] = [];


  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchCommunityTypeOptions();
  }

  oncreateAccidentsClicked() {
    this.communicationService.emitCreateAccidentsClicked();
  }

  private showWarningMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
    });
  }

  private fetchCommunityTypeOptions(): void {
    const communityTypeOptions = this.authService.getCommunityTypeOptions();
    this.communityTypeOptions = communityTypeOptions;
    console.log(this.communityTypeOptions);
  }

  createCommunity(): void {
    if ( !this.recreational_facilities || !this.occupancy_percentage || !this.number_of_houses || !this.square_meters_per_house || !this.number_of_offices || !this.square_meters_per_office || !this.above_ground_floors || !this.basement_floors || !this.adjacent_buildings_count || !this.isolated_buildings_count || !this.last_renovation_year || !this.community_type)
    {
      this.showWarningMessage('Por favor, complete todos los campos.'); return;
    }
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const communitiesData = {
        file_id:this.authService.getFileId(),
        community_code: this.authService.getCommunityCode(),
        recreational_facilities: this.recreational_facilities,
        occupancy_percentage: this.occupancy_percentage,
        number_of_houses: this.number_of_houses,
        square_meters_per_house: this.square_meters_per_house,
        number_of_offices: this.number_of_offices,
        square_meters_per_office: this.square_meters_per_office,
        above_ground_floors: this.above_ground_floors,
        basement_floors: this.basement_floors,
        adjacent_buildings_count: this.adjacent_buildings_count,
        isolated_buildings_count: this.isolated_buildings_count,
        last_renovation_year: this.last_renovation_year,
        community_type: this.community_type,
      };

      this.http.post('http://v.claimcenter.com:8000/api/communities/', communitiesData, { headers }).subscribe(
        (response) => {
          console.log('Comunidad creada exitosamente', response);
          this.showWarningMessage('Comunidad creada exitosamente');
          this.oncreateAccidentsClicked();
        },
        (error) => {
          console.error('Error al crear la comunidad', error);
          this.showWarningMessage('Error al crear la comunidad');
        }
      );
    } else {
      console.error('No hay token de autorización disponible.');
      this.showWarningMessage('Su sesión ha expirado');
    }
  }
}
