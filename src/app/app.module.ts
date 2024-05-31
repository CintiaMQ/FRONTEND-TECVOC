import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/users/login/login.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { ListarProductosComponent } from './pages/productos/listar-productos/listar-productos.component';
import { CrearProductosComponent } from './pages/productos/crear-productos/crear-productos.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { VerProductoComponent } from './pages/productos/ver-producto/ver-producto.component';
import { EditarProductosComponent } from './pages/productos/editar-productos/editar-productos.component';
import { InicioComponent } from './pages/inicio/inicio/inicio.component';
import { UserDashboardComponent } from './pages/alumnos/user-dashboard/user-dashboard.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { TestComponent } from './pages/alumnos/test/test.component';
import { VideosComponent } from './pages/alumnos/videos/videos.component';
import { ResultadosComponent } from './pages/alumnos/resultados/resultados.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHome, faList, faFileAlt, faVideo, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { DashbaordComponent } from './pages/admin/dashbaord/dashbaord.component';
import { CreateCuestionarioComponent } from './pages/admin/create-cuestionario/create-cuestionario.component';
import { CuestionariosComponent } from './pages/admin/cuestionarios/cuestionarios.component';
import { UsuariosComponent } from './pages/admin/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    ListarProductosComponent,
    CrearProductosComponent,
    NavbarComponent,
    VerProductoComponent,
    EditarProductosComponent,
    InicioComponent,
    UserDashboardComponent,
    SidebarComponent,
    TestComponent,
    VideosComponent,
    ResultadosComponent,
    DashbaordComponent,
    CreateCuestionarioComponent,
    CuestionariosComponent,
    UsuariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faHome, faList, faFileAlt, faVideo, faSignOutAlt);
  }
}
