import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  @Input() isMenuOpen: boolean = false;  // Añadido para el menú hamburguesa
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleMenu = new EventEmitter<void>();  // Añadido para el menú hamburguesa
  isSidebarVisible: boolean = true;
  isAuthenticated: boolean;
  userName: string | null = '';
  userRole: string | null = '';

  constructor(private usersService: UsersService) {
    this.isAuthenticated = this.usersService.isAuthenticated();
  }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.userRole = localStorage.getItem('role');
  }

  logout() {
    this.usersService.logout();
  }
}
