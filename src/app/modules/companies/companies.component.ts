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
  private readonly companyProfilesUrl: string;
  companyProfiles: any;
  searchInput: string = '';
  lastClickedCategory: string | boolean = false;
  open: boolean = false;
  checkboxSelections: { [key: string]: boolean } = {};

  toggleDropdown() {
    this.open = !this.open;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  toggleCheckbox(option: string) {
    this.checkboxSelections[option] = !this.checkboxSelections[option];
  }

  closeDropdown() {
    this.open = false;
  }

constructor(
    private communicationService: CommunicationService,
    public service: HttpClientService,
    public http: HttpClient) {
      this.companyProfilesUrl = this.baseUrl + 'enterprises/';

      this.communicationService.userClicked$.subscribe((category: string | boolean) => {
        this.lastClickedCategory = category;
        this.handleUserClicked(category);
      });
    }

    private handleUserClicked(category: string | boolean): void {
      if (typeof category === 'boolean') {
        const url = `${this.companyProfilesUrl}`;
        console.log(url);
        this.http.get(url).subscribe((data) => {
          this.companyProfiles = data;
          console.log(data);
        });
      }
    }


    ngOnInit(): void {}

    onSearchClick(): void {

        let searchUrl = `${this.companyProfilesUrl}`;

        if (this.checkboxSelections['nombre']) searchUrl += `&name=${this.searchInput}`;
        if (this.checkboxSelections['email']) searchUrl += `&emails_associated__email=${this.searchInput}`;
        if (this.checkboxSelections['documento legal']) searchUrl += `&legal_document==${this.searchInput}`;


        console.log(this.companyProfilesUrl);

        this.http.get(searchUrl).subscribe((data) => {
          this.companyProfiles = data;
          console.log(data);
        });

    }

    onCheckboxChange(selectedCategory: string): void {
      Object.keys(this.checkboxSelections).forEach((category) => {
        if (category !== selectedCategory) {
          this.checkboxSelections[category] = false;
        }
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
        actualNumber = Math.floor((offset / 10)+2);
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

