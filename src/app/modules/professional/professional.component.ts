import { Component, OnInit, ElementRef  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent implements OnInit {

  private readonly baseUrl: string = environment.apiUrl;

  signature: File | null = null;

  id: string = '';
  academic_title: string = '';
  license_number: string = '';
  professional_category: string = '';
  zone_codes: string = '';
  professional_codes: string = '';
  profile: string = '';
  fileNameDisplay: string = 'Sin archivo por escoger...';

  additionalZoneCodes: { zone_codes: string }[] = [];
  additionalProfessionalCodes: { professional_codes: string }[] = [];



  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private el: ElementRef,
  ) { }

  ngOnInit(): void {
    this.addProfessionalCodesField();
    this.addZoneCodesField();
  }

  createProfessional(): void {
    const authToken = this.authService.getAuthToken();
    const userId = this.authService.getId();

    if (authToken && userId && this.signature) {
      const formData = new FormData();
      formData.append('signature', this.signature);
      formData.append('academic_title', this.academic_title);
      formData.append('license_number', this.license_number);
      formData.append('professional_category', this.professional_category);
      formData.append('profile', this.profile);

      for (let i = 0; i < this.additionalZoneCodes.length; i++) {
        formData.append(`zone_codes[${i}]`, this.additionalZoneCodes[i].zone_codes);
      }

      for (let i = 0; i < this.additionalProfessionalCodes.length; i++) {
        formData.append(`professional_codes[${i}]`, this.additionalProfessionalCodes[i].professional_codes);
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      const endpoint = `${this.baseUrl}professionals/`;

      this.http.post(endpoint, formData, { headers })
        .subscribe(
          (response) => {
            console.log('Datos de profesional creados con éxito:', response);
            this.snackBar.open('Datos de profesional creados con éxito', 'Cerrar', { duration: 3000 });
          },
          (error) => {
            console.error('Error al crear Datos de profesional:', error);
            this.snackBar.open('Error al crear Datos de profesional', 'Cerrar', { duration: 3000 });
          }
        );
    }
  }

  onFileChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.signature = fileList[0];
      this.fileNameDisplay = this.signature.name;
    } else {
      this.fileNameDisplay = 'No file chosen...';
    }
  }

  addProfessionalCodesField(): void {
    this.additionalProfessionalCodes.push({ professional_codes: '' });
  }

  removeProfessionalCodesField(index: number): void {
    this.additionalProfessionalCodes.splice(index, 1);
  }

  addZoneCodesField(): void {
    this.additionalZoneCodes.push({ zone_codes: '' });
  }

  removeZoneCodesField(index: number): void {
    this.additionalZoneCodes.splice(index, 1);
  }
}
