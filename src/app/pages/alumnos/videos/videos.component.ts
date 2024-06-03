import { Component, OnInit } from '@angular/core';
import { YoutubeService } from './youtube.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  userName: string = 'Estudiante';
  careerVideos: any[] = [];
  tecsupVideos: any[] = [];
  tecsupChannelId: string = 'UCwXCzKLGlxtnV8LO984cPpQ'; // ID del canal de Tecsup

  isCollapsed = false;
  isMenuOpen = false;

  constructor(private youtubeService: YoutubeService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getCareerVideos('Diseño y Desarrollo de software');
    this.getTecsupVideos();
  }

  getCareerVideos(career: string) {
    this.youtubeService.searchVideos(career).subscribe((response: any) => {
      this.careerVideos = response.items || [];
    }, error => {
      console.error('Error al obtener videos de carrera', error);
    });
  }

  getTecsupVideos() {
    this.youtubeService.getVideosByChannel(this.tecsupChannelId).subscribe((response: any) => {
      this.tecsupVideos = response.items || [];
    }, error => {
      console.error('Error al obtener videos de Tecsup', error);
    });
  }

  getVideoUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
