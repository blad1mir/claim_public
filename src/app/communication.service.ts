import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private userClickedSource = new Subject<boolean>();
  userClicked$ = this.userClickedSource.asObservable();

  private companyClickedSource = new Subject<boolean>();
  companyClicked$ = this.companyClickedSource.asObservable();

  private userProfileClickedSource = new Subject<boolean>();
  userProfileClicked$ = this.userProfileClickedSource.asObservable();

  private companyProfileClickedSource = new Subject<boolean>();
  companyProfileClicked$ = this.companyProfileClickedSource.asObservable();

  emitUserClicked() {
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userClickedSource.next(true); // Desactivar empresas al activar usuarios
  }

  emitCompanyClicked() {
    this.userClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.companyClickedSource.next(true); // Desactivar usuarios al activar empresas
  }

  emitUserProfileClicked() {
    this.userClickedSource.next(false);
    this.companyClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userProfileClickedSource.next(true); // Desactivar empresas al activar usuarios
  }

  emitCompanyProfileClicked() {
    this.userClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyClickedSource.next(false);
    this.companyProfileClickedSource.next(true); // Desactivar usuarios al activar empresas
  }
}
