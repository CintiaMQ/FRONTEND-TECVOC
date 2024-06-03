// user-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { ResultadosService } from 'src/app/services/resultados.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  userName: string | null = null;
  isCollapsed: boolean = false;
  isMenuOpen: boolean = false;  // Añadido para el menú hamburguesa
  cuestionarios: any[] = [/* Tus cuestionarios */];
  currentQuestionIndex: number = 0;
  correctAnswers: number = 0;
  totalQuestions: number = this.cuestionarios[0]?.Preguntas.length || 0;
  recommendedCareer: string = '';
  showResult: boolean = false;

  constructor(private usersService: UsersService, private resultsService: ResultadosService, private router: Router) {}

  ngOnInit(): void {
    this.userName = this.usersService.getUserName();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectAnswer(questionId: number, answerValue: any) {
    // Lógica para manejar la selección de respuestas
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.currentQuestionIndex++;
    } else {
      this.showResult = true;
      const testResults = {
        correctAnswers: this.correctAnswers,
        totalQuestions: this.totalQuestions,
        recommendedCareer: this.recommendedCareer
      };
      this.resultsService.saveResults(testResults).subscribe(
        response => {
          console.log('Resultados guardados:', response);
          this.router.navigate(['/resultados']);
        },
        error => {
          console.error('Error al guardar los resultados:', error);
        }
      );
    }
  }

  restartTest() {
    this.currentQuestionIndex = 0;
    this.correctAnswers = 0;
    this.showResult = false;
  }

  goHome() {
    this.router.navigate(['/inicio']);
  }
}
