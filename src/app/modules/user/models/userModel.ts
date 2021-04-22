
export class SimpleCardModel {
  id: number;
  continuityDay: number;
  totalWords: number;
  wordLearned: number;
  nameCard: string;
  imgUrl: string;
  timeTarget: number;
  public constructor(init?: Partial<SimpleCardModel>) {
    Object.assign(this, init);
  }
}
export class TopicModel {
  id: number;
  topicName: string;
  imgUrl: string;
  status: boolean;
  topicNo: number;
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
