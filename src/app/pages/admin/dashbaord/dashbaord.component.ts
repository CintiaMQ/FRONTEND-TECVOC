import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.css'],
})
export class DashbaordComponent implements OnInit {
  totalUsuarios: number = 0;
  usuariosUltimaSemana: any[] = [];
  usuariosUltimoMes: any[] = [];

  showSemanaUsuarios: boolean = false;
  showMesUsuarios: boolean = false;
  userName: string | null = null;
  isCollapsed: boolean = false;
  isMenuOpen: boolean = false; // Añadido para el menú hamburguesa
  cuestionarios: any[] = [
    /* Tus cuestionarios */
  ];
  currentQuestionIndex: number = 0;
  correctAnswers: number = 0;
  totalQuestions: number = this.cuestionarios[0]?.Preguntas.length || 0;
  recommendedCareer: string = '';
  showResult: boolean = false;
  constructor(
    private usuariosService: UsuariosService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.loadTotalUsuarios();
    this.loadUsuariosUltimaSemana();
    this.loadUsuariosUltimoMes();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  loadTotalUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe((data) => {
      this.totalUsuarios = data.length;
    });
  }

  loadUsuariosUltimaSemana(): void {
    this.usuariosService
      .getUsuariosRegistradosUltimaSemana()
      .subscribe((data) => {
        this.usuariosUltimaSemana = data;
      });
  }

  loadUsuariosUltimoMes(): void {
    this.usuariosService.getUsuariosRegistradosUltimoMes().subscribe((data) => {
      this.usuariosUltimoMes = data;
    });
  }
  toggleSemanaUsuarios(): void {
    this.showSemanaUsuarios = !this.showSemanaUsuarios;
  }

  toggleMesUsuarios(): void {
    this.showMesUsuarios = !this.showMesUsuarios;
  }
}
