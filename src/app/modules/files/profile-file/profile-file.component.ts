import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommunicationService } from 'src/app/communication.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile-file',
  templateUrl: './profile-file.component.html',
  styleUrls: ['./profile-file.component.scss', '.././files.component.scss']
})
export class ProfileFileComponent implements OnInit {

  assignment: string = '';
  description: string = '';
  type: string = '';
  status: string = '';
  code: string = '';
  policy_details: string = '';
  assignmentName: string = '';

  fileClient: any[] = [];
  filteredList: any[] = [];
  fileStatus: { name: string, status: string }[] = [];
  fileType: { name: string, type: string }[] = [];
  showOptions: boolean = false;

  file: any[] = [];

  editEnabled: boolean = false;

  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchFile();
    this.fetchFileClient();
    this.fetchFileStatusChoises();
    this.fetchFileTypeOptions();
  }

  onEditEnabledClicked(){
    this.editEnabled = true;
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

  private fetchFileStatusChoises(): void {
    const fileStatusChoices = this.authService.getFileStatusChoices();
    this.fileStatus = fileStatusChoices;
    console.log(this.fileStatus);
  }

  private fetchFileTypeOptions(): void {
    const fileTypeOptions = this.authService.getFilesTypeOptions();
    this.fileType = fileTypeOptions;
    console.log(this.fileType);
  }

  private showWarningMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
    });
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

  fetchFile(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const fileId = this.authService.getProfileFileId();

      this.http.get(`http://v.claimcenter.com:8000/api/incident_files/${fileId}/`, { headers })
        .subscribe(
          (response: any) => {
            console.log('file Clients:', response);
            this.file = response;
            this.assignment = response.assignment;
            this.description = response.description;
            this.type = response.type;
            this.status = response.status;
            this.code = response.code;
            this.policy_details = response.policy_details;
          },
          (error) => {
            console.error('Error fetching file Clients:', error);
          }
        );
    } else {
      console.error('No hay token de autorización disponible.');
    }
  }

  updateFile(): void {
    if (!this.assignment || !this.description || !this.type || !this.status)
    {
      this.showWarningMessage('Por favor, complete todos los campos.'); return;
    }
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

      const fileId = this.authService.getProfileFileId();

      this.http.put(`http://v.claimcenter.com:8000/api/incident_files/${fileId}/`, filesData, { headers }).subscribe(
        (response) => {
          console.log('Expediente editado exitosamente', response);
          this.showWarningMessage('Expediente editado exitosamente');
          this.editEnabled = false;

        },
        (error) => {
          console.error('Error al editar el Expediente', error);
          this.showWarningMessage('Error al editar el Expediente');
        }
      );
    } else {
      console.error('No hay token de autorización disponible.');
      this.showWarningMessage('Su sesión ha expirado');
    }
  }

}
