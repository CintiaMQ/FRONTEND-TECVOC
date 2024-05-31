import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {
  private apiUrl = 'http://localhost:5000/api/cuestionarios';

  constructor(private http: HttpClient) {}

  getCuestionarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCuestionarioById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCuestionario(cuestionario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cuestionario);
  }

  updateCuestionario(id: string, cuestionario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cuestionario);
  }

  deleteCuestionario(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
