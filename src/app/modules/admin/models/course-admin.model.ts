export class AdminCourse {
  courseName: string;
  creator: string;
  dateCreated: string;
  type: string;
  public constructor(init?: Partial<AdminCourse>) {
    Object.assign(this, init);
  }
}
