import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  selectedUsuario: any = null;
  isEditing: boolean = false;
  userName: string | null = null;
  isCollapsed: boolean = false;
  isMenuOpen: boolean = false;  // Añadido para el menú hamburguesa
  cuestionarios: any[] = [/* Tus cuestionarios */];
  currentQuestionIndex: number = 0;
  correctAnswers: number = 0;
  totalQuestions: number = this.cuestionarios[0]?.Preguntas.length || 0;
  recommendedCareer: string = '';
  showResult: boolean = false;

  constructor(private usuariosService: UsuariosService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.loadUsuarios();
    this.userName = this.usersService.getUserName();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  loadUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe(
      data => {
        this.usuarios = data;
      },
      error => {
        Swal.fire('Error', 'Error al cargar los usuarios', 'error');
      }
    );
  }

  selectUsuario(usuario: any): void {
    this.selectedUsuario = { ...usuario };
    this.isEditing = false;
  }

  editUsuario(usuario: any): void {
    this.selectedUsuario = { ...usuario };
    this.isEditing = true;
  }

  saveUsuario(): void {
    if (this.isEditing) {
      this.usuariosService.updateUsuario(this.selectedUsuario._id, this.selectedUsuario).subscribe(
        () => {
          this.loadUsuarios();
          this.selectedUsuario = null;
          Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
        },
        error => {
          Swal.fire('Error', 'Error al actualizar el usuario', 'error');
        }
      );
    } else {
      this.usuariosService.createUsuario(this.selectedUsuario).subscribe(
        () => {
          this.loadUsuarios();
          this.selectedUsuario = null;
          Swal.fire('Éxito', 'Usuario creado correctamente', 'success');
        },
        error => {
          Swal.fire('Error', 'Error al crear el usuario', 'error');
        }
      );
    }
  }

  deleteUsuario(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.deleteUsuario(id).subscribe(
          () => {
            this.loadUsuarios();
            Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
          },
          error => {
            Swal.fire('Error', 'Error al eliminar el usuario', 'error');
          }
        );
      }
    });
  }

  clearSelection(): void {
    this.selectedUsuario = null;
    this.isEditing = false;
  }
}
