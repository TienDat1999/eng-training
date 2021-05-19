import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {environment} from '../../../../environments/environment';
import {ConnectionModel} from '@app/modules/user/models/connnection.Model';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public connection: signalR.HubConnection;
  token: string;
  userId: string;
  userChosen: string;
  userOl: any = [];
  resultOption: any;
  constructor() {
    const value = JSON.parse(localStorage.getItem('userEnglishTraining')) ;
    this.token = value?.token;
    this.userId = value?.userId;
  }

  startConnection(): void {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/hub?userId=${this.userId}`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        headers: { token: this.token },
      })
      .configureLogging(signalR.LogLevel.Trace)
      // .withHubProtocol(new signalR.JsonHubProtocol())
      .build();
    this.connection.start().then(() => {
      console.log('hub connection Started!');
    }).catch((e) => {
      console.log('There was an error connecting to the hub. Please check the configuration.', e);
    });
  }

  askServer(): void {
    //  console.log(this.connection)
    this.connection.invoke('GetListUserConnected').catch(err => console.error(err));
  }
  stopConnection(): void{
    this.connection.stop().then(() => console.log('disconnect'));
  }
  askServerListener(): any {
   this.connection.on('userConnected', (users) => {
        this.userOl = users;
    });
  }
  DirectMessage(): void {
   // console.log(this.userOl.random());
    const user = this.userOl.filter( val => val.key !== this.userId);
    const index = _.random(user.length - 1);
    const userDirective = user[index]?.value;
    this.connection.invoke('DirectMessage', `${userDirective}`).catch(err => console.error(err));
  }
}
