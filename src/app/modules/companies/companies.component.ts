import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../communication.service';
import { HttpClientService } from 'src/app/core/http/data-layer/http-client.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SelectedCompanyService } from './selected-company.service';

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

  nombreInput: string = "";
  emailInput: string = "";
  documentoLegalInput: string = "";

  lastClickedCategory: string | boolean = false;
  open: boolean = false;
  checkboxSelections: { [key: string]: boolean } = {};
  isBuscarButtonActive: boolean = true;

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
    private selectedCompanyService: SelectedCompanyService,
    public http: HttpClient) {
      this.companyProfilesUrl = this.baseUrl + 'enterprises/';

      this.communicationService.companyClicked$.subscribe((category: string | boolean) => {
        this.lastClickedCategory = category;
        this.handleCompanyClicked(category);
        console.log(this.handleCompanyClicked(category));
      });
    }

    private handleCompanyClicked(category: string | boolean): void {
      let url: string = '';

      if (typeof category === 'string') {
        const categoryQuery = this.getCategoryQuery(category);
        if (categoryQuery !== '') {
          url = `${this.companyProfilesUrl}?categories__category=${categoryQuery}`;
        }
      }
      console.log(url);

      this.http.get(url).subscribe((data) => {
        this.companyProfiles = data;
        console.log(data);
      });

    }

    private getCategoryQuery(category: string): string {
      switch (category) {
        case 'cliente':
          return 'Cliente';
        case 'proveedor':
          return 'Proveedor';
        case 'profesional':
          return 'Profesional';
        case 'asistencia':
          return 'Asistencia';
        case 'reparador':
          return 'Reparador Alternativo';
        case 'colaborador':
          return 'Empresa Colaboradora';
        case 'AIDE':
          return 'Reparador AIDE';
        default:
          return 'persona';
      }
    }


    ngOnInit(): void {}

    onSearchClick(): void {
      this.toggleBuscarButton(true);

      if (typeof this.lastClickedCategory === 'string') {
        const categoryQuery = this.getCategoryQuery(this.lastClickedCategory);

        let searchUrl = `${this.companyProfilesUrl}?categories__category=${categoryQuery}`;
        searchUrl += `&search=${this.searchInput}`;

        console.log(searchUrl);

        this.http.get(searchUrl).subscribe((data) => {
          this.companyProfiles = data;
          console.log(data);
        });
      } else {
        console.error('No se pudo obtener la categoría para la búsqueda.');
      }
    }

    getDocumentoLegalInput(): string {
      return this.documentoLegalInput || "";
    }

    getEmailInput(): string {
      return this.emailInput || "";
    }

    getNombreInput(): string {
      return this.nombreInput || "";
    }

    onSearchAvzClick(): void {
      this.toggleBuscarButton(true);

      if (typeof this.lastClickedCategory === 'string') {
        const categoryQuery = this.getCategoryQuery(this.lastClickedCategory);

        let searchUrl = `${this.companyProfilesUrl}?categories__category=${categoryQuery}`;

        searchUrl += `&name=${this.getNombreInput()}&emails_associated__email=${this.getEmailInput()}&legal_document=${this.getDocumentoLegalInput()}`;

        console.log(searchUrl);

        this.http.get(searchUrl).subscribe((data) => {
          this.companyProfiles = data;
          console.log(data);
        });
        console.log(searchUrl);
      } else {
        console.error('No se pudo obtener la categoría para la búsqueda.');
      }
    }

    onCheckboxChange(selectedCategory: string): void {
      Object.keys(this.checkboxSelections).forEach((category) => {
        if (category !== selectedCategory) {
          this.checkboxSelections[category] = false;
        }
      });
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

    toggleBuscarButton(activate: boolean): void {
      this.isBuscarButtonActive = activate;
    }

    onSelectCompanyProfile(id: string): void {
      this.selectedCompanyService.setSelectedCompanyid(id);
      this.onCompanyProfileClick();
    }

    onCompanyProfileClick() {
      this.communicationService.emitCompanyProfileClicked();
    }

    onCreateCompanyClick() {
      this.communicationService.emitCreateCompanyClicked();
    }
  }

