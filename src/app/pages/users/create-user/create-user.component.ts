import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  surname: string = '';
  age: string = '';
  educationLevel: string = '';
  acceptTerms: boolean = false;
  role: string = 'user';

  constructor(private http: HttpClient, private router: Router) {}

  handleRegister(event: Event) {
    event.preventDefault();

    const payload: any = {
      email: this.email,
      password: this.password,
      role: this.role
    };

    if (this.role === 'user') {
      payload.name = this.name;
      payload.surname = this.surname;
      payload.age = this.age;
      payload.educationLevel = this.educationLevel;
      payload.acceptTerms = this.acceptTerms;
    }

    this.http.post('http://localhost:5000/api/users/register', payload)
      .subscribe((response: any) => {
        console.log('User registered successfully:', response);
        const { token, role, userName } = response;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('userName', userName);
        this.router.navigate([this.role === 'admin' ? '/user-dashboard' : '/user-dashboard']);
      }, error => {
        console.error('Error registering user:', error);
        alert('Error registering user');
      });
  }

  handleLoginRedirect() {
    this.router.navigate(['/login']);
  }

}
