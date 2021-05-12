export class MessageModel<T>{
  isSuccess: string;
  message: string;
  data: T;
  public constructor(init?: Partial<MessageModel<T>>) {
    Object.assign(this, init);
  }
}
