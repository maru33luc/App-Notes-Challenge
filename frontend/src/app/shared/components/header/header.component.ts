import { Component, Input } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn?: boolean;
  userName?: string | null ;
  isMenuOpen = false;

  constructor(private loginService: LoginService, 
    private router:Router) {}

  ngOnInit(): void {
   this.loginService.authState$?.subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.userName = user.nombre;
      } else {
        this.isLoggedIn = false;
        this.userName = null;
      }
    });
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.loginService.authState$?.next(null);
    this.router.navigate(['/notes-list']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
