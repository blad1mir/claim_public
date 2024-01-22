import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'authToken';
  private refreshTokenKey = 'refreshToken';
  private verifiedKey = 'verified';
  private idkey = 'id';

  constructor(
    private backendService: BackendService
  ) {}

  setAuthTokens(authToken: string, refreshToken: string): void {
    localStorage.setItem(this.authTokenKey, authToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  setVerified(verified: string): void {
    localStorage.setItem(this.verifiedKey, verified);
  }

  setId(id: string): void {
    localStorage.setItem(this.idkey, id);
  }

  getAuthToken(): string {
    return localStorage.getItem(this.authTokenKey) || '';
  }

  getVerified(): string {
    console.log(this.verifiedKey);
    return localStorage.getItem(this.verifiedKey) || '';
  }

  getId(): string {
    return localStorage.getItem(this.idkey) || '';
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey) || '';
  }

  clearAuthTokens(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.authTokenKey;
  }

  checkBackendConnection(): void {
    this.backendService.checkConnection().subscribe(
      () => {
        console.log('Conexión con el backend establecida.');
      },
      (error) => {
        console.error('No se pudo establecer conexión con el servidor.');
      }
    );
  }
}
