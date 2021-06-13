export class AdminCourse {
  courseName: string;
  creator: string;
  dateCreated: string;
  type: string;
  public constructor(init?: Partial<AdminCourse>) {
    Object.assign(this, init);
  }
}
export class AdminUser {
  userName: string;
  gmail: string;
  public constructor(init?: Partial<AdminUser>) {
    Object.assign(this, init);
  }
}
