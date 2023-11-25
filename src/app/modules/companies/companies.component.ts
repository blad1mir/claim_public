import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../communication.service';
import { HttpClientService } from 'src/app/core/http/data-layer/http-client.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  private readonly baseUrl: string = environment.apiUrl;
  companyProfiles: any;
  searchInput: string = '';

  constructor(
    private communicationService: CommunicationService,
    public service: HttpClientService,
    public http: HttpClient) {
      this.http.get(this.baseUrl + 'enterprises/').subscribe((data) => {
        this.companyProfiles = data;
        console.log(data);
      });
    }

    ngOnInit(): void {}

    onSearchClick(): void {
      const searchUrl = this.baseUrl + 'enterprises/' + '?search=' + this.searchInput;
      this.http.get(searchUrl).subscribe((data) => {
        this.companyProfiles = data;
        console.log(data);
      });
    }

    onSelectUserProfile(username: string): void {
      //this.selectedUserService.setSelectedUsername(username); // Establece el usuario seleccionado
      this.onUserProfileClick();
    }

    onUserProfileClick() {
      this.communicationService.emitUserProfileClicked();
    }


    paginationNumber(): number  {
      let actualNumber;

      if (this.companyProfiles.next) {
        const offset = this.extractOffset(this.companyProfiles.next);
        actualNumber = Math.floor(offset / 10);
      } else if (this.companyProfiles.previous) {
        const offset = this.extractOffset(this.companyProfiles.previous);
        actualNumber = Math.floor(offset / 10);
      } else {
        return 1;
      }

      return actualNumber === 0 ? 1 : actualNumber;
    }

    onNextClick(): void {
      if (this.companyProfiles.next) {
        const newUrl = this.companyProfiles.next;
        this.http.get(newUrl).subscribe((data) => {
          this.companyProfiles = data;
          console.log(data);
        });
      }
    }

    onPreviousClick(): void {
      if (this.companyProfiles.previous) {
        const newUrl = this.companyProfiles.previous;
        this.http.get(newUrl).subscribe((data) => {
          this.companyProfiles = data;
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

