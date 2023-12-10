import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectedCompanyService {
  private selectedCompanyidSubject = new BehaviorSubject<string | null>(null);
  selectedCompanyid$ = this.selectedCompanyidSubject.asObservable();

  setSelectedCompanyid(companyid: string | null): void {
    this.selectedCompanyidSubject.next(companyid);
  }
}
