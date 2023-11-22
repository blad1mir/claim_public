import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../communication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
  }

  onUserProfileClick() {
    this.communicationService.emitUserProfileClicked();
  }

}
