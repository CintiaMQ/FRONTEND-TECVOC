import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { LoginComponent } from './pages/users/login/login.component';
import { InicioComponent } from './pages/inicio/inicio/inicio.component';
import { UserDashboardComponent } from './pages/alumnos/user-dashboard/user-dashboard.component';
import { TestComponent } from './pages/alumnos/test/test.component';
import { VideosComponent } from './pages/alumnos/videos/videos.component';
import { ResultadosComponent } from './pages/alumnos/resultados/resultados.component';
import { AuthGuard } from './auth.guard';
import { CuestionariosComponent } from './pages/admin/cuestionarios/cuestionarios.component';

const routesInicio: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'crear-usuario', component: CreateUserComponent },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: 'test', component: TestComponent, canActivate: [AuthGuard] },
  { path: 'videos', component: VideosComponent, canActivate: [AuthGuard] },
  { path: 'resultados', component: ResultadosComponent, canActivate: [AuthGuard] },
  { path: '', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'cuestionarios', component: CuestionariosComponent },
  { path: '', redirectTo: '', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routesInicio)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
