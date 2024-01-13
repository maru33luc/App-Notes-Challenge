import { Component } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../../../services/note.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  userId? : number;

  constructor(private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private noteService: NoteService) {
      this.loginService.authState$?.subscribe((user) => {
        if(user){
          this.userId = user.id;
        }
      });
     }

  loginForm: FormGroup = this.formBuilder.group({
    correo: ['', [Validators.required, Validators.email]],
    contraseñaHash: ['', [Validators.required]]
  });

  login() {
    if (this.loginForm.invalid) {
      return;
    } else {
      try {
        this.loginService.login(this.loginForm.value.correo, this.loginForm.value.contraseñaHash);
        this.noteService.getActiveNotes(this.userId);
        setTimeout(() => {
          this.router.navigate(['/notes-list']);
        }, 500);

      } catch (e) {
        console.log(e);
      }
    }
  }
}
