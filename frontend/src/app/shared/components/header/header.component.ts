import { Component, Input } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn: boolean = true;
  userName?: string | null ;

  constructor(private loginService: LoginService, 
    private router:Router) {}

  ngOnInit(): void {
    this.loginService.authState$?.subscribe((user) => {
      console.log('user', user);
      if (user) {
        
        this.isLoggedIn = true;
        
      } else {
        this.isLoggedIn = false;
        this.userName = '';
      }
    });
    this.loginService.authState$?.subscribe((user) => {
      if (user) {
          this.loginService.getUserName().then((nombre) => {
              if (nombre) {
                  console.log('nombre: ', nombre);
                  this.userName = nombre;
              }
          });
      }
  });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/notes']);
  }
}
