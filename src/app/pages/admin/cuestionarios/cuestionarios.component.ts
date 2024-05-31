import { Component, OnInit } from '@angular/core';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit {
  cuestionarios: any[] = [];
  selectedCuestionario: any = null;

  constructor(private cuestionarioService: CuestionarioService) {}

  ngOnInit(): void {
    this.getCuestionarios();
  }

  getCuestionarios(): void {
    this.cuestionarioService.getCuestionarios().subscribe(
      (data) => {
        this.cuestionarios = data;
      },
      (error) => {
        console.error('Error al obtener los cuestionarios', error);
      }
    );
  }

  editCuestionario(cuestionario: any): void {
    this.selectedCuestionario = { ...cuestionario };
  }

  saveCuestionario(): void {
    if (this.selectedCuestionario._id) {
      this.cuestionarioService.updateCuestionario(this.selectedCuestionario._id, this.selectedCuestionario).subscribe(
        () => {
          this.getCuestionarios();
          this.selectedCuestionario = null;
        },
        (error) => {
          console.error('Error al actualizar el cuestionario', error);
        }
      );
    } else {
      this.cuestionarioService.createCuestionario(this.selectedCuestionario).subscribe(
        () => {
          this.getCuestionarios();
          this.selectedCuestionario = null;
        },
        (error) => {
          console.error('Error al crear el cuestionario', error);
        }
      );
    }
  }

  deleteCuestionario(id: string): void {
    this.cuestionarioService.deleteCuestionario(id).subscribe(
      () => {
        this.getCuestionarios();
      },
      (error) => {
        console.error('Error al eliminar el cuestionario', error);
      }
    );
  }

  cancelEdit(): void {
    this.selectedCuestionario = null;
  }
}
