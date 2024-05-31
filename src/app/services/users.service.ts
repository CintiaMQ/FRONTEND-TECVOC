import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private isAuthenticatedValue: boolean = true; // Simulación de autenticación
  private userNameValue: string = 'John Doe'; // Simulación de nombre de usuario
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }
  private userName: string = 'John Doe'; 
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, { email, password });
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
  }
  
}
