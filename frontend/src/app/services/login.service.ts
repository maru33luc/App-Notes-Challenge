import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/User';
import axios from 'axios';
import { environments } from '../../environments/environments';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authState$ = signal<User|null>(null);
  userUrl = environments.urlBackUsers;

  constructor( @Inject(PLATFORM_ID) private platformId: Object) {
    this.isUserLoggedIn().then((user) => {
      if (user) {
        this.authState$.set(user);
      }
    });
  }

  async getUsers() {
    const res = await axios.get(this.userUrl);
    return res.data;
  }

  async login(email: string, password: string) {
    try {
      const userCredential = {
        correo: email,
        contraseñaHash: password
      }
      const user = await axios.post(`${this.userUrl}/auth`, userCredential, { withCredentials: true });

      if (isPlatformBrowser(this.platformId)) {
        if (user && !user.data.error) {
          localStorage.setItem('user', JSON.stringify(user.data));
          this.authState$?.set(user.data);
          alert('Sesión iniciada con éxito');
          window.location.href = '/notes-list';
          return user.data;
        } else {
          alert('No se pudo iniciar sesión');
          window.location.href = '/login';
          return null;
        }
      }

    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async register(user: User) {
    let lenght = 0;
    try {
      const users = await this.getUsers();
      if (users) {
        lenght = users.length;
        const userFound = users.find((u: User) => u.correo === user.correo);
        if (userFound) {
          alert('El email ya está registrado');
          return;
        }
      }
      try {
        const userCredential = await axios.post(`${this.userUrl}`, user);
        alert('Usuario registrado con éxito');
        window.location.href = '/login';
      } catch (error) {
        alert('No se pudo registrar el usuario');
      }
    } catch (error) {
      alert('No se pudo obtener la lista de usuarios');
    }
  }

  async logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      this.authState$?.set(null);
      window.location.href = '/notes-list';
      alert('Sesión cerrada con éxito');
    }

  }

  async getDataActualUser() {
    try {
      const res = await fetch(`${this.userUrl}/auth`, { credentials: 'include' });
      if (res.status === 200) {
        return await res.json();
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getUserName() {
    const data = await this.getDataActualUser();
    if (data) {
      return data.nombre;
    }
  }

  async isUserLoggedIn(): Promise<User | null | undefined> {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        return JSON.parse(user);
      } else {
        return null;
      }
    }
    return undefined;
  }

  async buscarUsuarioPorId(id: number): Promise<User | null> {
    try {
      const res = await fetch(`${this.userUrl}/${id}`);
      if (res.status === 200) {
        return await res.json();
      }
      else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
