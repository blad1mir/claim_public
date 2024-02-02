import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'authToken';
  private refreshTokenKey = 'refreshToken';
  private verifiedKey = 'verified';
  private idkey = 'id';
  private fileIdkey = 'fileId';
  private profileFileIdkey = 'profileFileId'
  private communityCodeIdkey = 'communityCodeId'


  constructor(
    private backendService: BackendService
  ) {}

  setAuthTokens(authToken: string, refreshToken: string): void {
    localStorage.setItem(this.authTokenKey, authToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  setVerified(verified: string): void {
    localStorage.setItem(this.verifiedKey, verified);
  }

  setId(id: string): void {
    localStorage.setItem(this.idkey, id);
  }

  setFileId(fileId: string): void {
    localStorage.setItem(this.fileIdkey, fileId);
  }

  setProfileFileId(proFileFileId: string): void {
    localStorage.setItem(this.profileFileIdkey, proFileFileId);
  }

  setCommunityCode(communityCodeId: string): void {
    localStorage.setItem(this.communityCodeIdkey, communityCodeId);
  }

  setFileStatusChoices(fileStatusChoices: any[]): void {
    localStorage.setItem('fileStatusChoices', JSON.stringify(fileStatusChoices));
  }
  setFileSTypeOptions(fileTypeOptions: any[]): void {
    localStorage.setItem('fileTypeOptions', JSON.stringify(fileTypeOptions));
  }

  setInsuredRelationChoises(insuredRelationChoises: any[]): void {
    localStorage.setItem('insuredRelationChoises', JSON.stringify(insuredRelationChoises));
  }

  setPolicyBranchTypeOptions(policyBranchTypeOptions: any[]): void {
    localStorage.setItem('policyBranchTypeOptions', JSON.stringify(policyBranchTypeOptions));
  }

  setCommunityTypeOptions(communityTypeOptions: any[]): void {
    localStorage.setItem('communityTypeOptions', JSON.stringify(communityTypeOptions));
  }

  setClaimcauseTypeChoices(claimcauseTypeChoices: any[]): void {
    localStorage.setItem('claimcauseTypeChoices', JSON.stringify(claimcauseTypeChoices));
  }

  getAuthToken(): string {
    return localStorage.getItem(this.authTokenKey) || '';
  }

  getVerified(): string {
    console.log(this.verifiedKey);
    return localStorage.getItem(this.verifiedKey) || '';
  }

  getId(): string {
    return localStorage.getItem(this.idkey) || '';
  }

  getFileId(): string {
    return localStorage.getItem(this.fileIdkey) || '';
  }

  getProfileFileId(): string {
    return localStorage.getItem(this.profileFileIdkey) || '';
  }

  getCommunityCode(): string {
    return localStorage.getItem(this.communityCodeIdkey) || '';
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey) || '';
  }

  getFileStatusChoices(): any[] {
    const fileStatusChoicesString = localStorage.getItem('fileStatusChoices');
    return fileStatusChoicesString ? JSON.parse(fileStatusChoicesString) : [];
  }

  getFilesTypeOptions(): any[] {
    const fileTypeOptionsString = localStorage.getItem('fileTypeOptions');
    return fileTypeOptionsString ? JSON.parse(fileTypeOptionsString) : [];
  }

  getInsuredRelationChoises(): any[] {
    const insuredRelationChoisesString = localStorage.getItem('insuredRelationChoises');
    return insuredRelationChoisesString ? JSON.parse(insuredRelationChoisesString) : [];
  }

  getPolicyBranchTypeOptions(): any[] {
    const policyBranchTypeOptionsString = localStorage.getItem('policyBranchTypeOptions');
    return policyBranchTypeOptionsString ? JSON.parse(policyBranchTypeOptionsString) : [];
  }

  getCommunityTypeOptions(): any[] {
    const communityTypeOptionsString = localStorage.getItem('communityTypeOptions');
    return communityTypeOptionsString ? JSON.parse(communityTypeOptionsString) : [];
  }

  getClaimcauseTypeChoices(): any[] {
    const claimcauseTypeChoicesString = localStorage.getItem('claimcauseTypeChoices');
    return claimcauseTypeChoicesString ? JSON.parse(claimcauseTypeChoicesString) : [];
  }

  clearAuthTokens(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.authTokenKey;
  }

  checkBackendConnection(): void {
    this.backendService.checkConnection().subscribe(
      () => {
        console.log('Conexión con el backend establecida.');
      },
      (error) => {
        console.error('No se pudo establecer conexión con el servidor.');
      }
    );
  }
}
