import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectedUserService {
  private selectedUseridSubject = new BehaviorSubject<string | null>(null);
  selectedUserid$ = this.selectedUseridSubject.asObservable();

  setSelectedUserid(userid: string | null): void {
    this.selectedUseridSubject.next(userid);
  }
}
