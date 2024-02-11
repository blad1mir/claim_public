import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommunicationService } from 'src/app/communication.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss', '.././files.component.scss']
})
export class CommunitiesComponent implements OnInit {


  recreational_facilities: string = '';
  community_code: string = '';
  occupancy_percentage: string = '';
  number_of_houses: string = '';
  square_meters_per_house: string = '';
  number_of_offices: string = '';
  square_meters_per_office: string = '';
  above_ground_floors: string = '';
  basement_floors: string = '';
  adjacent_buildings_count: string = '';
  isolated_buildings_count: string = '';
  last_renovation_year: string = '';
  community_type: string = '';

  communityTypeOptions: { name: string, type: string }[] = [];

  noCommunities: boolean = true;
  editEnabled: boolean = false;

  community: any[] = [];

  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchCommunity();
    this.fetchCommunityTypeOptions();
  }

  onProfileAccidentsClicked() {
    this.communicationService.emitProfileAccidentsClicked();
  }

  onProfileCommunitiesClicked() {
    this.communicationService.emitProfileCommunitiesClicked();
  }

  onProfileHomeAddressClicked() {
    this.communicationService.emitProfileHomeAddressClicked();
  }

  onProfileInsuranceClicked() {
    this.communicationService.emitProfileInsuranceClicked();
  }

  onProfilePoliciesClicked() {
    this.communicationService.emitProfilePoliciesClicked();
  }

  emitProfileFilesClicked() {
    this.communicationService.emitProfileFilesClicked();
  }

  fetchCommunity(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const fileId = this.authService.getProfileFileId();

      this.http.get(`http://v.claimcenter.com:8000/api/communities/${fileId}/`, { headers })
        .subscribe(
          (response: any) => {
            console.log('community:', response);
            this.community = response;
            this.recreational_facilities = response.recreational_facilities;
            this.community_code = response.community_code;
            this.occupancy_percentage = response.occupancy_percentage;
            this.number_of_houses = response.number_of_houses;
            this.square_meters_per_house = response.square_meters_per_house;
            this.number_of_offices = response.number_of_offices;
            this.square_meters_per_office = response.square_meters_per_office;
            this.above_ground_floors = response.above_ground_floors;
            this.basement_floors = response.basement_floors;
            this.adjacent_buildings_count = response.adjacent_buildings_count;
            this.isolated_buildings_count = response.isolated_buildings_count;
            this.last_renovation_year = response.last_renovation_year;
            this.community_type = response.community_type;
          },
          (error) => {
            console.error('Error fetching community:', error);
            this.noCommunities = false;
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

  onEditEnabledClicked(){
    this.editEnabled = true;
  }

  private fetchCommunityTypeOptions(): void {
    const communityTypeOptions = this.authService.getCommunityTypeOptions();
    this.communityTypeOptions = communityTypeOptions;
    console.log(this.communityTypeOptions);
  }

  updateCommunity(): void {
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

      const fileId = this.authService.getProfileFileId();

      this.http.put(`http://v.claimcenter.com:8000/api/communities/${fileId}/`, communitiesData, { headers }).subscribe(
        (response) => {
          console.log('Comunidad editada exitosamente', response);
          this.showWarningMessage('Comunidad editada exitosamente');
          this.editEnabled = false;
        },
        (error) => {
          console.error('Error al editar la comunidad', error);
          this.showWarningMessage('Error al editar la comunidad');
        }
      );
    } else {
      console.error('No hay token de autorización disponible.');
      this.showWarningMessage('Su sesión ha expirado');
    }
  }

}
