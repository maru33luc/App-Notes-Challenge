import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { User } from '../../../interfaces/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
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
           console.log('this.registerForm.value', this.registerForm.value);
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
