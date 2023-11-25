import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectedUserService {
  private selectedUsernameSubject = new BehaviorSubject<string | null>(null);
  selectedUsername$ = this.selectedUsernameSubject.asObservable();

  setSelectedUsername(username: string | null): void {
    this.selectedUsernameSubject.next(username);
  }
}
