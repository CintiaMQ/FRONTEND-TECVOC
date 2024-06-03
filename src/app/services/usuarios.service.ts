import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:5000/api/users'; // Cambia la URL según sea necesario

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUsuarioById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, usuario);
  }

  updateUsuario(id: string, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, usuario);
  }

  deleteUsuario(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getUsuariosRegistradosUltimaSemana(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recent/week`);
  }

  getUsuariosRegistradosUltimoMes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recent/month`);
  }
}

// // usuarios.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UsuariosService {
//   private apiUrl = 'http://localhost:5000/api/users'; // Cambia la URL según sea necesario

//   constructor(private http: HttpClient) { }

//   getUsuarios(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   getUsuarioById(id: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/${id}`);
//   }

//   createUsuario(usuario: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/register`, usuario);
//   }

//   updateUsuario(id: string, usuario: any): Observable<any> {
//     return this.http.put<any>(`${this.apiUrl}/${id}`, usuario);
//   }

//   deleteUsuario(id: string): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/${id}`);
//   }
//   getUsuariosRegistradosUltimaSemana(): Observable<any[]> {
//     const oneWeekAgo = new Date();
//     oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//     return this.http.get<any[]>(`${this.apiUrl}?createdAt_gte=${oneWeekAgo.toISOString()}`);
//   }

//   getUsuariosRegistradosUltimoMes(): Observable<any[]> {
//     const oneMonthAgo = new Date();
//     oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
//     return this.http.get<any[]>(`${this.apiUrl}?createdAt_gte=${oneMonthAgo.toISOString()}`);
//   }
// }
