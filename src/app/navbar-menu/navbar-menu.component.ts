import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommunicationService } from '../communication.service';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  collapsed = true;
  screenWidth = 0;

  constructor(private communicationService: CommunicationService) { }


  ngOnInit(): void {
  }


  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  onUserClick() {
    this.communicationService.emitUserClicked();
  }

  onCompanyClick() {
    this.communicationService.emitCompanyClicked();
  }
}
