import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/communication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-files',
  templateUrl: './create-files.component.html',
  styleUrls: ['./create-files.component.scss', '../.././users/user-create/user-create.component.scss',]
})
export class CreateFilesComponent implements OnInit {

  assignment: string = '';
  description: string = '';
  type: string = 'gessinase';
  status: string = '';
  assignmentName: string = '';

  fileClient: any[] = [];
  filteredList: any[] = [];
  showOptions: boolean = false;

  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchFileClient();
  }

  onCreateInsuranceClicked() {
    this.communicationService.emitCreateInsuranceClicked();
  }

  toggleOptions(): void {
    this.filteredList = this.fileClient;
    this.showOptions = !this.showOptions;
  }

  selectOption(fileClients: any): void {
    this.assignmentName = fileClients.name;
    this.assignment = fileClients.assignment;
    this.showOptions = false;
  }

  filterOptions(): void {
    const filterTerm = this.assignmentName.toLowerCase();
    this.filteredList = this.fileClient.filter(fileClients =>
      fileClients.name.toLowerCase().includes(filterTerm)
    );
  }

  fetchFileClient(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      this.http.get('http://v.claimcenter.com:8000/api/incident_files/dropdown_clients_to_assignment_file/', { headers })
        .subscribe(
          (response: any) => {
            console.log('file Clients:', response);
            this.fileClient = response;
          },
          (error) => {
            console.error('Error fetching file Clients:', error);
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

  createFile(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const filesData = {

        assignment:this.assignment,
        description:this.description,
        type:this.type,
        status:this.status,
      };

      this.http.post('http://v.claimcenter.com:8000/api/incident_files/', filesData, { headers }).subscribe(
        (response) => {
          console.log('Expediente creado exitosamente', response);
          this.showWarningMessage('Expediente creado exitosamente');
          this.authService.setFileId((response as any).file_id);
          this.onCreateInsuranceClicked();

        },
        (error) => {
          console.error('Error al crear el Expediente', error);
          this.showWarningMessage('Error al crear el Expediente');
        }
      );
    } else {
      console.error('No hay token de autorización disponible.');
      this.showWarningMessage('Su sesión ha expirado');
    }
  }
}
