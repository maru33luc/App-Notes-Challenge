import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { User } from '../../../interfaces/User';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports:[CommonModule,
    ReactiveFormsModule, FormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService, private router: Router) { }

  registerForm: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    contraseñaHash: ['', Validators.required]
  });

  registerUser(): void {
    if(this.registerForm.invalid){
      return;
    }else{
      try{
        const user: User = {
          nombre: this.registerForm.value.nombre,
          correo: this.registerForm.value.correo,
          contraseñaHash: this.registerForm.value.contraseñaHash
        }
      
           this.loginService.register(user);
            this.router.navigate(['/log']);
      }catch(e){
        console.log(e);
      }
  
    }
  }

}
