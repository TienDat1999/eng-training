import {Member, ResponseClass} from '../modules/user/models/class.model';
import * as faker from 'faker';
import {sample} from 'lodash';
import {ExerciseStatusType} from '@app/modules/share/enum';

export function getMockMemberInClass(size: number, status: ExerciseStatusType = 0): ResponseClass {
  return new ResponseClass({
    count: size,
    data: getMember(size, status),
  });
}

export function getMember(size: number, status: ExerciseStatusType): Member[] {
  return Array(size).fill({}).map((item: Member, index) => {
    return new Member({
      id: index + 1,
      rank: index + 1,
      fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      score: faker.random.number({min: 0, max: 100}),
      status: status === 0 ? sample([ExerciseStatusType.Complete, ExerciseStatusType.Incomplete]) : sample([status]),
    });
  });
}
