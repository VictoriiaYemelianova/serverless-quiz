export interface ICategoryModel {
  quizId?: string;
  name: string;
}

export interface IQuizModel {
  id: string;
  question: string;
  answer: Array<number>;
  options: Array<IOptionModel>
  quizId: string;
}

export interface IOptionModel {
  id?: string;
  option: string;
}