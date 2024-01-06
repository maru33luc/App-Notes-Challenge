import { Component } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  constructor(private router: Router, 
    private loginService:LoginService,
    private formBuilder:FormBuilder) { }

  loginForm: FormGroup = this.formBuilder.group({
    correo: ['',[Validators.required, Validators.email]],
    contraseñaHash: ['',[Validators.required]]
  });

  login(){
    if(this.loginForm.invalid){
      return;
    }else{
      try{
        this.loginService.login(this.loginForm.value.correo, this.loginForm.value.contraseñaHash);
        console.log('usuario logueado con exito' );
        this.router.navigate(['/notes']);
      }catch(e){
        console.log(e);
      }
    }
  }
}
