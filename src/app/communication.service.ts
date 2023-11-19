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

  emitUserClicked() {
    this.userClickedSource.next(false);
    this.companyClickedSource.next(true); // Desactivar empresas al activar usuarios
  }

  emitCompanyClicked() {
    this.companyClickedSource.next(false);
    this.userClickedSource.next(true); // Desactivar usuarios al activar empresas
  }
}
