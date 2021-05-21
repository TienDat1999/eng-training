import {CrawWordModel} from "@app/modules/user/models/word.model";

export  class UserConnected {
  key: string;
  value: [string];
  public constructor(init?: Partial<UserConnected>) {
    Object.assign(this, init);
  }
}
export class UserCompetition{
 // competitor: UserConnected;
  userName: string;
  resultCorrect: number;
  public constructor(init?: Partial<UserCompetition>) {
    Object.assign(this, init);
    this.resultCorrect = 0;
  }
}
export  class InitCompetition{
  competitor: string;
  words: CrawWordModel[];
}
export class UserInfo{
  userName: string;
  idUser: string;
  idConnection: string;
  public constructor(init?: Partial<UserInfo>) {
    Object.assign(this, init);
  }
}
