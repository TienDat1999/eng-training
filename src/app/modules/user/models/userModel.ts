
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
  public constructor(init?: Partial<Course>) {
    Object.assign(this, init);
  }
}
export  class  TopicStatusModel {
  status: boolean;
  topic: TopicModel;
  public constructor(init?: Partial<TopicStatusModel>) {
    Object.assign(this, init);
  }
}
export class TopicModel {
  id: number;
  courseId: number;
  topicName: string;
  imgUrl: string;
  status: boolean;
  words: WordModel[];
  public constructor(init?: Partial<TopicModel>) {
    Object.assign(this, init);
  }
}
export class WordModel {
  id: number;
  wordEng: string;
  imgUrl: string;
  audioUrl: string;
  wordType: number;
  example: string;
  diffWord: number;
  ipa: string;
  define: string;
  status: any;
  repeatNumber: number;
  public constructor(init?: Partial<WordModel>) {
    Object.assign(this, init);
  }
}
export class WordLearnedModel{
  WordId: number;
  UserCourseId: number;
  TopicId: number;
  public constructor(init?: Partial<WordLearnedModel>) {
    Object.assign(this, init);
  }
}
