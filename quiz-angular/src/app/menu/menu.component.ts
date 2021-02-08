import { Component, OnInit } from '@angular/core';
import { ICategoryModel } from '../models/quiz.model';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public menuItems: Array<ICategoryModel> = [];

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getQuizzesCategoryList().subscribe((el: Array<ICategoryModel>) => {
      if (el.length) {
        this.menuItems = el;
      }
    })
  }

}
