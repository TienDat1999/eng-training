
export class CourseModel {
  course: Course;
  totalWord: number;
  wordLearned: number;
  public constructor(init?: Partial<CourseModel>) {
    Object.assign(this, init);
  }
}
export  class Course {
  id: number;
  author: string;
  dateCreated: Date;
  courseName: string;
  imgUrl: string;
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
