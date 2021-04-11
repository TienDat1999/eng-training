export class ValueKeyModel {
  key: any;
  value: any;
  description: string;

  constructor(init?: Partial<ValueKeyModel>) {
    Object.assign(this, init);
  }
}
