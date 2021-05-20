export  class UserConnected {
  key: string;
  value: [];
  public constructor(init?: Partial<UserConnected>) {
    Object.assign(this, init);
  }
}
export class UserCompetition{
  competitor: UserConnected;
  score: number;
  public constructor(init?: Partial<UserCompetition>) {
    Object.assign(this, init);
  }
}
