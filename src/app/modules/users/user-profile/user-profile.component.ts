import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../../communication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
  }

  onUserEditClick() {
    this.communicationService.emitUserEditClicked();
  }

}
