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

  file: any[] = [];

  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchFile();
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



}
