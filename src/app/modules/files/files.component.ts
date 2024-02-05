import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/communication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss',]
})
export class FilesComponent implements OnInit {

  isBuscarButtonActive: boolean = true;
  isBuscarAvzButtonActive: boolean = false;

  fileProfiles: any = {};

  filesData: any[] = [];


  constructor(
    private communicationService: CommunicationService,
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.fetchFiles('http://v.claimcenter.com:8000/api/incident_files/');
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



  onProfileFileClicked(id: string){
    this.authService.setProfileFileId(id);
    this.communicationService.emitProfileFilesClicked();
  }

  fetchFiles(url: string): void {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    this.http.get(url, { headers })
      .subscribe(
        (response: any) => {
          console.log('Incident Files:', response);
          this.filesData = response.results;
          this.fileProfiles = response;
        },
        (error) => {
          console.error('Error fetching Incident Files:', error);
        }
      );
  }

  formatDateWithoutTime(date: string): string {
    const dateParts = date.slice(0, -17).split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    return formattedDate;
  }

  paginationNumber(): number  {
    let actualNumber;

    if (this.fileProfiles.next) {
      const offset = this.extractOffset(this.fileProfiles.next);
      actualNumber = Math.floor(offset / 10);
    } else if (this.fileProfiles.previous) {
      const offset = this.extractOffset(this.fileProfiles.previous);
      actualNumber = Math.floor((offset / 10)+2);
    } else {
      return 1;
    }

    return actualNumber === 0 ? 1 : actualNumber;
  }

  onNextClick(): void {
    if (this.fileProfiles.next) {
      this.fetchFiles(this.fileProfiles.next);
    }
  }

  onPreviousClick(): void {
    if (this.fileProfiles.previous) {
      this.fetchFiles(this.fileProfiles.previous);
    }
  }

  private extractOffset(url: string): number {
    const match = /offset=(\d+)/.exec(url);
    return match ? +match[1] : 0;
  }

}
