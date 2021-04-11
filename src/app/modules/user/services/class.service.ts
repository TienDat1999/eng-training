import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Member, ResponseClass} from '@app/modules/user/models/class.model';
import {environment} from '@environments/environment';
import {getMockMemberInClass} from '@app/mock-data/class.mock';
import {ExerciseStatusType} from '@app/modules/share/enum';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor() {
  }

  getMemberInClass(size: number = 10): Observable<ResponseClass> {
    if (environment.production) {
      console.log('get Member in class');
    }
    return of(getMockMemberInClass(size));
  }

  addMemberInClass(member: Member): Observable<boolean> {
    if (environment.production) {
      console.log('add member');
    }
    return of(true);
  }

  removeMemberInClass(member: Member): Observable<boolean> {
    if (environment.production) {
      console.log(`remove member ${member.id}`);
    }
    return of(true);
  }

  getRankingMember(size: number = 10): Observable<ResponseClass> {
    if (environment.production) {
      console.log('get rank member');
    }
    return of(getMockMemberInClass(size));
  }

  getMemberByStatus(size: number = 10, status: ExerciseStatusType = 0): Observable<ResponseClass> {
    if (environment.production) {
      console.log('get member by status');
    }
    return of(getMockMemberInClass(size, status));
  }
}
