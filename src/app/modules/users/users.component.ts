import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../communication.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from 'src/app/core/http/data-layer/http-client.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  apiUrl1= 'http://v.claimcenter.com:8000/api/';

  user = {
    username : 'blad',
    password : '28A3_0005'
  }

  userProfiles: any;

  constructor(
    private communicationService: CommunicationService,
    public service: HttpClientService,
    public http: HttpClient
    ) {
      this.http.get(this.apiUrl1 + 'user_profiles/').subscribe(data => {
        this.userProfiles = data;
        console.log(data);
      });
    }

  ngOnInit(): void {
  }

  onUserProfileClick() {
    this.communicationService.emitUserProfileClicked();
  }


}
