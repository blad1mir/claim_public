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
  isUserMenuOpen = false;
  isUsersMenuOpen = false;
  isCompanyMenuOpen = false;

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
    this.communicationService.emitPeopleClicked('person');
  }

  onContactClick(){
    //this.isUserMenuOpen = !this.isUserMenuOpen;
    this.communicationService.emitPeopleClicked('contacto');
  }

  onUsersMenuClick(){
    this.isUsersMenuOpen = !this.isUsersMenuOpen;
  }

  onCompanyClick() {
    this.isCompanyMenuOpen = !this.isCompanyMenuOpen;
    //this.communicationService.emitCompanyClicked();
  }

  onProvidersClick() {
    this.communicationService.emitPeopleClicked('proveedor');
  }

  onClientsClick() {
    this.communicationService.emitPeopleClicked('cliente');
  }

  onProfessionalsClick() {
    this.communicationService.emitPeopleClicked('profesional');
  }

  onPrescriptorsClick() {
    this.communicationService.emitPeopleClicked('prescriptor');
  }

  onTramitersClick() {
    this.communicationService.emitPeopleClicked('tramitador');
  }


  onClientsCompanyClick(){
  this.communicationService.emitCompanyClicked('cliente');
  }

  onProvidersCompanyClick(){
    this.communicationService.emitCompanyClicked('proveedor');
    }

  onProfessionalsCompanyClick(){
    this.communicationService.emitCompanyClicked('profesional');
  }

  onAssistantsCompanyClick(){
    this.communicationService.emitCompanyClicked('asistencia');
  }

  onRepairersCompanyClick(){
    this.communicationService.emitCompanyClicked('reparador');
  }

  onCollaboratorsCompanyClick(){
    this.communicationService.emitCompanyClicked('colaborador');
  }

  onAIDEsCompanyClick(){
    this.communicationService.emitCompanyClicked('AIDE');
  }

  onCreateUserClick() {
    this.communicationService.emitCreateUserClicked();
  }

  onEnableUserClick() {
    this.communicationService.emitUserEditClicked();
  }

}
