
export  class TranslateOption {
  data: string;
  target: string;
  source: string;
  public constructor(init?: Partial<TranslateOption>) {
    Object.assign(this, init);
  }
}
