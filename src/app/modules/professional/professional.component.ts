import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { BackendService } from 'src/app/core/services/backend.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent implements OnInit {

  private readonly baseUrl: string = environment.apiUrl;

  signature: string | null = null;

  id: string = '';
  academic_title: string = '';
  license_number: string = '';
  professional_category: string = '';
  practice_area: string = '';
  sinexia_code: string = '';
  profile: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
  }

  onFileChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      // Convertir la firma a una cadena base64
      this.convertFileToBase64(fileList[0]);
    }
  }

  convertFileToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.signature = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  createProfessional(): void {
    const authToken = this.authService.getAuthToken();
    const userId = this.authService.getId();

    if (authToken && userId) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      const changePasswordData = {
        id: this.authService.getId(),
        academic_title: this.academic_title,
        license_number: this.license_number,
        professional_category: this.professional_category,
        signature: this.signature,
        practice_area: this.practice_area,
        sinexia_code: this.sinexia_code,
        profile: this.profile,
      };

      const endpoint = `${this.baseUrl}professionals/`;

      this.http.post(endpoint, changePasswordData, { headers })
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

}
