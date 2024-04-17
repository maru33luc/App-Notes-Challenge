import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule,
     HeaderComponent, RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

}
