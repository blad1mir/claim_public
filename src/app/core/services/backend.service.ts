import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private backendUrl = 'http://v.claimcenter.com:8000/api';

  constructor(private http: HttpClient) {}

  checkConnection(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/user_profiles/roles/`).pipe(
      catchError((error) => {
        // Aquí puedes manejar el error de conexión con el backend
        console.error('Error de conexión con el backend:', error);
        return throwError(error);
      })
    );
  }
}
