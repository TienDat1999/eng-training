import {SimpleCardModel, WordModel, TopicModel} from '../modules/user/models/userModel';
import * as faker from 'faker';

import {random} from 'lodash';
export function courseCardMock(count: number): SimpleCardModel[] {
  return Array(count).fill({}).map((item: SimpleCardModel, index) => {
    return new SimpleCardModel({
      id: index + 1,
      continuityDay: faker.random.number({min: 10, max: 20}),
      totalWords: 799,
      wordLearned: faker.random.number({min: 100, max: 200}),
      nameCard: faker.name.title(),
      imgUrl: faker.image.transport(),
      timeTarget: faker.random.number({min: 10, max: 20}),
    });
  });
}
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
      word: faker.hacker.noun(),
      imgUrl: faker.image.image(),
      soundUrl: '',
      wordType: 0,
    });
  });
}
