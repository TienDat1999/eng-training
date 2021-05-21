import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {environment} from '../../../../environments/environment';
import * as _ from 'lodash';
import {UserInfo} from '@app/modules/user/models/competition.model';
@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public connection: signalR.HubConnection;
  userChosen: string;
  userOl: any = [];
  competitor: UserInfo;
  constructor() {
  }

  startConnection(): void {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/hub?userId=${this.userInformation.idUser}&userName=${this.userInformation.userName}`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
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
  get userInformation(): UserInfo{
    const value = JSON.parse(localStorage.getItem('userEnglishTraining')) ;
    return new UserInfo({
      userName: value?.userName,
      idUser: value?.userId,
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
  sendRequestCompetition(): void {
    const user = this.userOl.filter( val => val.key !== this.userInformation.idUser);
    const index = _.random(user.length - 1);
    const userDirective = user[index]?.value[0].idConnection;
    if (!!userDirective){
      this.competitor = new UserInfo({
        userName : user[index].value[0].userName,
        idConnection: user[index].value[0].idConnection,
        idUser: user[index].key,
      });
      this.connection.invoke('DirectMessage', `${userDirective}`, this.userInformation.userName).catch(err => console.error(err));
    }else{
      // TODO CHECK IF  userDirective = null NOT USER OL
      console.log('not found competitor');
    }
    }


}
