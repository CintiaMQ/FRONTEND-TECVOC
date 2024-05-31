import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultadosService } from 'src/app/services/resultados.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  userName: string | null = null;  // Permitir que userName sea null
  correctAnswers: number = 0;
  totalQuestions: number = 0;
  recommendedCareer: string = '';

  constructor(private resultsService: ResultadosService, private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    const results = localStorage.getItem('testResults');
    if (results) {
      const { correctAnswers, totalQuestions, recommendedCareer } = JSON.parse(results);
      this.correctAnswers = correctAnswers;
      this.totalQuestions = totalQuestions;
      this.recommendedCareer = recommendedCareer;
      console.log('Resultados recuperados:', { correctAnswers, totalQuestions, recommendedCareer });  // Agrega esto para verificar
    } else {
      console.log('No se encontraron resultados en localStorage');  // Agrega esto para verificar
      // Si no hay resultados en localStorage, redirigir a otra página
      this.router.navigate(['/user-dashboard']);
    }
  }
}  