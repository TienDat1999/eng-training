import {ExerciseStatusType} from '../../share/enum';

export class Member {
  id: number;
  fullName: string;
  score: number;
  status: ExerciseStatusType;

  public constructor(init?: Partial<Member>) {
    Object.assign(this, init);
  }
}

export class ResponseClass {
  data: Array<Member>;
  count: number;

  public constructor(init?: Partial<ResponseClass>) {
    Object.assign(this, init);
  }
}
