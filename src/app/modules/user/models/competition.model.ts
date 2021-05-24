import {CrawWordModel} from '@app/modules/user/models/word.model';

export class UserConnected {
  key: string;
  value: [string];

  public constructor(init?: Partial<UserConnected>) {
    Object.assign(this, init);
  }
}

export class UserCompetition {
  // competitor: UserConnected;
  userName: string;
  resultCorrect: number;

  public constructor(init?: Partial<UserCompetition>) {
    Object.assign(this, init);
    this.resultCorrect = 0;
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

export class ResultRoomCompetition {
  result: boolean;
  roomName: string;

  public constructor(init?: Partial<ResultRoomCompetition>) {
    Object.assign(this, init);
  }
}
