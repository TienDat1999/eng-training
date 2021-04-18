export class CrawWordModel {
  id: number;
  word: string;
  imgUrl: string;
  soundUrl: string;
  wordType: string;
  example: string;
  diffWord: number;
  ipa: string;
  define: string;
  public constructor(init?: Partial<CrawWordModel>) {
    Object.assign(this, init);
  }
}
