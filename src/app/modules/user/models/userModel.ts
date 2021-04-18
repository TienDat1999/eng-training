
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
  imgUrl: string;
  soundUrl: string;
  wordType: number;
  example: string;
  diffWord: number;
  ipa: string;
  public constructor(init?: Partial<WordModel>) {
    Object.assign(this, init);
  }
}
export class TypeWordModel extends WordModel{
  wordRandom: any;
  optionType: any;
  status: any;
  optionChoose: any;
  public constructor(init?: Partial<TypeWordModel>) {
    super();
    Object.assign(this, init);
  }
}
