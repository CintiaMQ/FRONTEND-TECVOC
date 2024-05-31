import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  userName: string | null = '';

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
