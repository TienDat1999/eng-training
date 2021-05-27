import {CrawWordModel} from '@app/modules/user/models/word.model';

export class UserConnected {
  key: string;
  value: [string];

  public constructor(init?: Partial<UserConnected>) {
    Object.assign(this, init);
  }
}

export class InitCompetition {
  competitor: string;
  words: CrawWordModel[];
}

export class UserInfoCompetition {
  userName: string;
  userId: string;
  connectionId: string;

  public constructor(init?: Partial<UserInfoCompetition>) {
    Object.assign(this, init);
  }
}
export class UserCompetition implements UserInfoCompetition {
  resultCorrect: number;
  public constructor(init?: Partial<UserCompetition>) {
    Object.assign(this, init);
    this.resultCorrect = 0;
  }

  connectionId: string;
  userId: string;
  userName: string;
}
export class ResultRoomCompetition {
  result: boolean;
  roomName: string;

  public constructor(init?: Partial<ResultRoomCompetition>) {
    Object.assign(this, init);
  }
}
export class RoomData {
  words: CrawWordModel[];
  userA: UserCompetition;
  userB: UserCompetition;
  totalWords: number;
  state: boolean;
  indexWord: number;
  public constructor(init?: Partial<RoomData>) {
    Object.assign(this, init);
    this.state = false;
    this.indexWord = 0;
  }
}
export class RoomUpdated {
  roomName: string;
  userId: string;

  public constructor(init?: Partial<RoomUpdated>) {
    Object.assign(this, init);
  }
}
