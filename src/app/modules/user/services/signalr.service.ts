import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {environment} from '../../../../environments/environment';
import * as _ from 'lodash';
import {UserInfoCompetition} from '@app/modules/user/models/competition.model';
import {AppNotify} from '@app/share/AppNotify';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public connection: signalR.HubConnection;
  userChosen: string;
  userOl: any = [];
  competitor: UserInfoCompetition;
  userCompetition = new UserInfoCompetition();
  constructor() {
    this.initUserCompetition();
  }

  startConnection(): void {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/hub?userId=${this.userCompetition.userId}`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Trace)
      // .withHubProtocol(new signalR.JsonHubProtocol())
      .build();
    this.connection.start().then(() => {
      console.log('hub connection Started!');
    }).catch((e) => {
      console.log('There was an error connecting to the hub. Please check the configuration.', e);
    });
  }

  initUserCompetition(): void {
    const value = JSON.parse(localStorage.getItem('userEnglishTraining'));
    this.userCompetition.userId = value?.userId;
    this.userCompetition.userName = value?.userName;
  }

  askServer(): void {
    //  console.log(this.connection)
    this.connection.invoke('GetListUserConnected').catch(err => console.error(err));
  }

  stopConnection(): void {
    this.connection.stop().then(() => console.log('disconnect'));
  }

  askServerListener(): any {
    this.connection.on('userConnected', (users) => {
      this.userOl = users;
    });
  }

  sendRequestCompetition(email): void {
    const userCompetitor = this.userOl.filter(val => val.key !== this.userCompetition.userId);
    const myConnectedId = this.userOl.filter(val => val.key === this.userCompetition.userId);
    this.userCompetition.connectionId = myConnectedId[0].value.connectionId;
    if (!!email) {
      const emailCompetitor = userCompetitor.filter(u => {
        return u.value.email === email;
      });
      if (emailCompetitor.length > 0) {
        const competitorConnectedId = emailCompetitor[0].value.connectionId;
        this.connection.invoke('SendRequestCompetitor', `${competitorConnectedId}`, this.userCompetition)
          .catch(err => console.error(err));
      } else {
        AppNotify.error('User not found');
      }
    } else {
      const index = _.random(userCompetitor.length - 1);
      const competitorConnectedId = userCompetitor[index]?.value.connectionId;
      if (!!competitorConnectedId) {
        this.connection.invoke('SendRequestCompetitor', `${competitorConnectedId}`, this.userCompetition)
          .catch(err => console.error(err));
      } else {
        AppNotify.warning('Not user online now');
      }
    }
  }
}
