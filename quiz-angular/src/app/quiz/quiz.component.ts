import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  public currentQuestionIndex: number = 0;
  public stepper: Array<number> = [];

  public quizList = [];

  constructor() { }

  ngOnInit(): void {
  }

  private generateStepper() {
    this.stepper = [];
    let step = this.currentQuestionIndex;

    for (let i = 0; i < 5; i++ ) {
      this.stepper.push(++step);
      if (i === 4) this.stepper.push(this.quizList.length);
      if (step === this.quizList.length) return;
    }
  }
}
