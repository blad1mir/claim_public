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

  private userProfileClickedSource = new Subject<boolean | string>(); // Puede ser booleano o string
  userProfileClicked$ = this.userProfileClickedSource.asObservable();

  private userEditClickedSource = new Subject<boolean>();
  userEditClicked$ = this.userEditClickedSource.asObservable();

  private companyProfileClickedSource = new Subject<boolean>();
  companyProfileClicked$ = this.companyProfileClickedSource.asObservable();

  emitUserClicked() {
    this.companyClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.userClickedSource.next(true);
  }

  emitCompanyClicked() {
    this.userClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.companyClickedSource.next(true);
  }

  emitUserProfileClicked(usernameOrBoolean?: boolean | string) {
    this.userClickedSource.next(false);
    this.companyClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userEditClickedSource.next(false);
    if (typeof usernameOrBoolean === 'string') {
      this.userProfileClickedSource.next(usernameOrBoolean);
    } else {
      this.userProfileClickedSource.next(true);
    }
  }

  emitUserEditClicked() {
    this.userClickedSource.next(false);
    this.companyClickedSource.next(false);
    this.companyProfileClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.userEditClickedSource.next(true);
  }

  emitCompanyProfileClicked() {
    this.userClickedSource.next(false);
    this.userProfileClickedSource.next(false);
    this.companyClickedSource.next(false);
    this.userEditClickedSource.next(false);
    this.companyProfileClickedSource.next(true);
  }
}
