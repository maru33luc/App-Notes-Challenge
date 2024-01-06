import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/User';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authState$: BehaviorSubject<any> | undefined = new BehaviorSubject(null) ;

  constructor() {
    // cargar el this.authState$ con el usuario logueado
    this.isUserLoggedIn().then((user) => {
      if (user) {
        this.authState$?.next(user);
      }
    });

  }

  async getUsers() {
    const res = await axios.get('http://localhost:3000/users');
    return res.data;
  }

  async login(email: string, password: string) {
    try {
      const userCredential = {
        correo: email,
        contraseñaHash: password
      }
      const user = await axios.post('http://localhost:3000/users/auth', userCredential, { withCredentials: true });

      if (user) {
        this.authState$?.next(user.data);
        return user.data;
      } else {
        alert('No se pudo iniciar sesión');
        window.location.href = '/login';
        return null;
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
        const userCredential = await axios.post('http://localhost:3000/users', user);
        alert('Usuario registrado con éxito');
      } catch (error) {
        alert('No se pudo registrar el usuario');
      }
    } catch (error) {
      alert('No se pudo obtener la lista de usuarios');
    }

  }

  async logout() {
    try {
      const res = await axios.post('http://localhost:3000/users/logout', {}, { withCredentials: true });
      this.authState$?.next(null);
      window.location.href = '/notes';
      if(res){
        alert('Sesión cerrada con éxito');
      }else{
        alert('No se pudo cerrar sesión');
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getDataActualUser() {
    try {
      const res = await axios.get('http://localhost:3000/users/auth', { withCredentials: true });
      if(res){
        return res.data;
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

async isUserLoggedIn(): Promise< User | null> {
  try {
      const res = await axios.get(`http://localhost:3000/users/auth`, { withCredentials: true });
      if (res.status === 200) {
          this.authState$?.next(res.data);
          return res.data;
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
