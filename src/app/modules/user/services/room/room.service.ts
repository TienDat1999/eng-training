import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {RoomUpdated} from '@app/modules/user/models/competition.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private  http: HttpClient ) { }
  getRoomData(roomName: string): Observable<any>{
    if (environment.production){
      console.log('get room data');
    }
    return this.http.get(`${environment.apiUrl}/api/room?name=${roomName}`);
  }
  removeRoomData(roomName: string): Observable<any>{
    if (environment.production){
      console.log('remove room data');
    }
    return this.http.delete(`${environment.apiUrl}/api/room?name=${roomName}`);
  }
  updateRoomData(roomUpdated: RoomUpdated ): Observable<any>{
    if (environment.production){
      console.log('update room data');
    }
    return this.http.put(`${environment.apiUrl}/api/room`, roomUpdated);
  }
}
