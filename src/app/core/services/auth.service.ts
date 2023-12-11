import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'authToken';
  private refreshTokenKey = 'refreshToken';

  // ...

  setAuthTokens(authToken: string, refreshToken: string): void {
    localStorage.setItem(this.authTokenKey, authToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  getAuthToken(): string {
    return localStorage.getItem(this.authTokenKey) || '';
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey) || '';
  }

  clearAuthTokens(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.authTokenKey;  // Retorna true si hay un token, false si no lo hay
  }
}
