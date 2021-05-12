import {CrawWordModel} from './word.model';

export  class AddTopicModel {
  words: CrawWordModel[];
  topicName: string;
  courseId: number;
  public constructor(init?: Partial<AddTopicModel>) {
    Object.assign(this, init);
  }
}
