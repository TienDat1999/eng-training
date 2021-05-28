export class Member {
  userName: string;
  score: number;
  public constructor(init?: Partial<Member>) {
    Object.assign(this, init);
  }
}
