import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken: string = '';
  private refreshToken: string = '';

  constructor() {}

  setAuthTokens(authToken: string, refreshToken: string): void {
    this.authToken = authToken;
    this.refreshToken = refreshToken;
  }

  getAuthToken(): string {
    return this.authToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  clearAuthTokens(): void {
    this.authToken = '';
    this.refreshToken = '';
  }

  isAuthenticated(): boolean {
    return !!this.authToken;  // Retorna true si hay un token, false si no lo hay
  }
}
