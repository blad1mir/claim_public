import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private readonly baseUrl: string = environment.apiUrl; // Utiliza el baseUrl desde el environment

  constructor(private http: HttpClient) {}

  // Función para realizar una solicitud GET
  public get<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<T>(url);
  }

  // Función para realizar una solicitud PUT
  public put<T>(endpoint: string, data: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.put<T>(url, data);
  }

  // Función para realizar una solicitud DELETE
  public delete<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.delete<T>(url);
  }

  // Función para realizar una solicitud POST
  public async post<T>(endpoint: string, data: any): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const response = this.http.post<T>(url, data);
    return firstValueFrom(response);
  }
}
