export class CrawWordModel {
  id: number;
  wordEng: string;
  audioUrl: string;
  wordType: string;
  example: string;
  ipa: string;
  define: string;
  defineVn: string;
  public constructor(init?: Partial<CrawWordModel>) {
    Object.assign(this, init);
  }
}
export class WordTopicModel {
  word: string;
  type: string;
  define: string;
  example: string;
  public constructor(init?: Partial<WordTopicModel>) {
    Object.assign(this, init);
  }
}
