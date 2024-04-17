import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports:[CommonModule, HeaderComponent, LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
