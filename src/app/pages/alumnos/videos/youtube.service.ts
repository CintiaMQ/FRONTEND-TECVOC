// youtube.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiKey = 'AIzaSyAJMi7GcNPeQks9izlZLYBgDUvXD-ki8Pk'; // Reemplaza esto con tu clave de API
  private apiUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {}

  searchVideos(query: string): Observable<any> {
    const params = {
      part: 'snippet',
      q: query,
      key: this.apiKey,
      type: 'video',
      maxResults: '10'
    };
    return this.http.get(`${this.apiUrl}/search`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getVideosByChannel(channelId: string): Observable<any> {
    const params = {
      part: 'snippet',
      channelId: channelId,
      key: this.apiKey,
      type: 'video',
      maxResults: '10'
    };
    return this.http.get(`${this.apiUrl}/search`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getChannelIdForUsername(username: string): Observable<any> {
    const params = {
      part: 'id',
      forUsername: username,
      key: this.apiKey
    };
    return this.http.get(`${this.apiUrl}/channels`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
