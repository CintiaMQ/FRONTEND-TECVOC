import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private usersService: UsersService) {}

  handleLogin(event: Event) {
    event.preventDefault();
    this.usersService.login(this.email, this.password).subscribe(
      response => {
        const { token, role, userName } = response;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('userName', userName);
        if (role === 'admin') {
          this.router.navigate(['/cuestionarios']);
        } else {
          this.router.navigate(['/user-dashboard']);
        }
      },
      error => {
        console.error('Error iniciando sesión:', error);
        alert('Error iniciando sesión');
      }
    );
  }

  handleRegisterRedirect() {
    this.router.navigate(['/crear-usuario']);
  }
}
