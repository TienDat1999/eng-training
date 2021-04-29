import {CourseModel, WordModel, TopicModel} from '../modules/user/models/userModel';
import * as faker from 'faker';

import {random} from 'lodash';

export function topicMock(count: number): TopicModel[] {
  return Array(count).fill({}).map((item: TopicModel, index) => {
    return new TopicModel({
      id: index + 1,
      topicName: faker.name.jobTitle(),
      imgUrl: faker.image.business(),
      status: false,
    });
  });
}
export function wordMock(count: number): WordModel[] {
  return Array(count).fill({}).map((item: WordModel, index) => {
    return new WordModel({
      id: index + 1,
      wordEng: faker.hacker.noun(),
      imgUrl: faker.image.image(),
      audioUrl: '',
      wordType: 0,
    });
  });
}
