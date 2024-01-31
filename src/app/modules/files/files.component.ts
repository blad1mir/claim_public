import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/communication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  isBuscarButtonActive: boolean = true;
  isBuscarAvzButtonActive: boolean = false;

  filesData: any[] = [];



  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.fetchIncidentFiles();
  }

  toggleBuscarButton(): void {
    this.isBuscarButtonActive = true;
    this.isBuscarAvzButtonActive = false;
  }

  toggleBuscarAvzButton(): void {
    this.isBuscarButtonActive = false;
    this.isBuscarAvzButtonActive = true;
  }

  oncreateFilesClicked() {
    this.communicationService.emitCreateFilesClicked();
  }

  fetchIncidentFiles(): void {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': authToken
    });

    this.http.get('http://v.claimcenter.com:8000/api/incident_files/', { headers })
      .subscribe(
        (response: any) => {
          console.log('Incident Files:', response);
          this.filesData = response; // Asigna los datos al arreglo para usar en el HTML
        },
        (error) => {
          console.error('Error fetching Incident Files:', error);
        }
      );
  }

}
