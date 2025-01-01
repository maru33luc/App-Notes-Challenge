import { Component, Input } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router, RouterLink } from '@angular/router';

import { LoginPageComponent } from '../../../auth/pages/login-page/login-page.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    LoginPageComponent
],
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
    const user = this.loginService.authState$();
      if (user) {
        this.isLoggedIn = true;
        this.userName = user.nombre;
      } else {
        this.isLoggedIn = false;
        this.userName = null;
      }

  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.loginService.authState$?.set(null);
    this.router.navigate(['/notes-list']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
