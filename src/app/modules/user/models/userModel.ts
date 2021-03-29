
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
  public constructor(init?: Partial<TopicModel>) {
    Object.assign(this, init);
  }
}
export class WordModel {
  id: number;
  word: string;
  imgUrl: any;
  soundUrl: string;
  type: number;
  sentence: any;
  public constructor(init?: Partial<WordModel>) {
    Object.assign(this, init);
  }
}

