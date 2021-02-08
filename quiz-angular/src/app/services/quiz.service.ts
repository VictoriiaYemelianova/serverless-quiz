import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategoryModel, IQuizModel } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'https://7ke6awe1ia.execute-api.us-east-1.amazonaws.com/dev';

  constructor(private http: HttpClient) { }

  getQuizzesCategoryList() {
    return this.http.get(`${this.apiUrl}/quizzes`);
  }

  createQuiz(quiz: ICategoryModel) {
    return this.http.post(`${this.apiUrl}/quiz`, quiz);
  }

  getFullQuizzesList(id: string) {
    return this.http.get(`${this.apiUrl}/questions/${id}`);
  }

  createQuestion(item: IQuizModel) {
    return this.http.get(`${this.apiUrl}/add-question`);
  }
}
