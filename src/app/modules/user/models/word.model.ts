export class CrawWordModel {
  word: string;
  soundUrl: string;
  wordType: string;
  example: string;
  ipa: string;
  define: string;
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
