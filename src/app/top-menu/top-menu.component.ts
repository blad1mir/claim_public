import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {}

  logout(): void {
    // Llamada al servicio de logout utilizando el refresh token
    this.authService.clearAuthTokens();
    this.router.navigate(['/login']);
  }

}
