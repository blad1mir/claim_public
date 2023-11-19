import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
  }

  onUserClick() {
    this.communicationService.emitUserClicked();
  }

  onCompanyClick() {
    this.communicationService.emitCompanyClicked();
  }
}
