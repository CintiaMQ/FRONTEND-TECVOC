import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  private apiUrl = 'http://tu-backend.com/api/results';

  constructor(private http: HttpClient) { }

  saveResults(results:any):Observable<any>{
    return this.http.post(this.apiUrl, results)
  }

  getResults(userId:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}
