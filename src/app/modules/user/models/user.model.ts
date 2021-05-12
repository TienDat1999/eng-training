
export  class  TopicStatusModel {
  status: boolean;
  topic: TopicModel;
  public constructor(init?: Partial<TopicStatusModel>) {
    Object.assign(this, init);
  }
}
export class TopicModel {
  id: number;
  courseId: number;
  topicName: string;
  imgUrl: string;
  status: boolean;
  words: WordModel[];
  public constructor(init?: Partial<TopicModel>) {
    Object.assign(this, init);
  }
}
export class WordModel {
  id: number;
  wordEng: string;
  imgUrl: string;
  audioUrl: string;
  wordType: number;
  example: string;
  diffWord: number;
  ipa: string;
  define: string;
  status: any;
  repeatNumber: number;
  public constructor(init?: Partial<WordModel>) {
    Object.assign(this, init);
  }
}
export class WordLearnedModel{
  wordId: number;
  userCourseId: number;
  topicId: number;
  courseId: number;
  public constructor(init?: Partial<WordLearnedModel>) {
    Object.assign(this, init);
  }
}
