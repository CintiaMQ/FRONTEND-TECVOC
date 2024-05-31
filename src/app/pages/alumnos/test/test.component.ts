import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  userName: string | null = '';
  cuestionarios: any;
  currentQuestionIndex: number = 0;
  selectedAnswers: { [key: number]: string } = {};
  totalScore: { [key: string]: number } = {};
  recommendedCareer: string | null = null;
  showResult: boolean = false;
  correctAnswers: number = 0;
  totalQuestions: number = 0;

  constructor(
    private testService: TestService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.testService.getCuestionarios().subscribe(data => {
      this.cuestionarios = data;
      this.totalQuestions = this.cuestionarios[0].Preguntas.length;
    });

    if (!this.usersService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.userName = this.usersService.getUserName();
    }
  }

  selectAnswer(questionId: number, answerValue: string) {
    this.selectedAnswers[questionId] = answerValue;
    this.updateTotalScore(questionId, answerValue);
    this.nextQuestion();
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.cuestionarios[0].Preguntas.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.showResults();
    }
  }

  updateTotalScore(questionId: number, answerValue: string) {
    const pregunta = this.cuestionarios[0].Preguntas.find((pregunta: any) => pregunta.id === questionId);
    const opcion = pregunta.opciones.find((opcion: any) => opcion.valor === answerValue);

    this.cuestionarios[0].Carreras.forEach((carrera: any) => {
      const criterio = carrera.criterios.find(
        (criterio: any) => criterio.pregunta === questionId && criterio.respuesta === opcion.valor
      );

      if (criterio) {
        if (this.totalScore[carrera.nombre]) {
          this.totalScore[carrera.nombre] += criterio.puntaje;
        } else {
          this.totalScore[carrera.nombre] = criterio.puntaje;
        }
      }
    });
  }

  showResults() {
    this.recommendedCareer = this.determineRecommendedCareer();
    this.correctAnswers = Object.keys(this.selectedAnswers).length;
    this.showResult = true;
  }

  determineRecommendedCareer(): string {
    let maxScore = 0;
    let recommendedCareer = '';

    for (const carrera in this.totalScore) {
      if (this.totalScore[carrera] > maxScore) {
        maxScore = this.totalScore[carrera];
        recommendedCareer = carrera;
      }
    }

    return recommendedCareer;
  }

  restartTest() {
    this.currentQuestionIndex = 0;
    this.selectedAnswers = {};
    this.totalScore = {};
    this.recommendedCareer = null;
    this.showResult = false;
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
