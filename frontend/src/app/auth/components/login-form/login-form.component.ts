import { Component } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../../../services/note.service';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  userId?: number | null;

  constructor(private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private noteService: NoteService) {
    this.userId = this.loginService.authState$()?.id ?? null;
  }

  loginForm: FormGroup = this.formBuilder.group({
    correo: ['maru@gmail.com', [Validators.required, Validators.email]],
    contraseñaHash: ['123456', [Validators.required]]
  });

  login() {
    if (this.loginForm.invalid) {
      return;
    } else {
      try {
        this.loginService.login(this.loginForm.value.correo, this.loginForm.value.contraseñaHash);
        this.noteService.getActiveNotes(this.userId ?? null);

      } catch (e) {
        console.log(e);
      }
    }
  }
}
