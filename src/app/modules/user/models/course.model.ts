export  class PublicCourse {
  course: Course;
  follower: number;
  public constructor(init?: Partial<PublicCourse>) {
    Object.assign(this, init);
  }
}

export class CourseModel {
  course: Course;
  totalWord: number;
  wordLearned: number;
  isEdit: boolean;
  public constructor(init?: Partial<CourseModel>) {
    Object.assign(this, init);
    this.isEdit = false;
  }
}
export  class SimpleCourseModel{
  id: number;
  courseName: string;
  imgUrl: string;
  public constructor(init?: Partial<SimpleCourseModel>) {
    Object.assign(this, init);
  }
}
export  class ImageSnippet{
  pending: boolean;
  status: string;
  public constructor(public src: string, public file: File) {
    this.pending = false;
    this.status = 'init';
  }
}
export  class Course {
  id: number;
  authorId: number;
  authorName: string;
  dateCreated: Date;
  courseName: string;
  imgUrl: string;
  isPublish: boolean;
  public constructor(init?: Partial<Course>) {
    Object.assign(this, init);
  }
}
