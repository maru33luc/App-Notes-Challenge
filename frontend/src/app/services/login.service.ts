import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/User';
import axios from 'axios';
import { environments } from '../../environments/environments';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authState$: BehaviorSubject<any> | undefined = new BehaviorSubject(null) ;
  userUrl = environments.urlBackUsers;

  constructor(private cookieS: CookieService) {
    // this.isUserLoggedIn().then((user) => {
    //   if (user) {
    //     this.authState$?.next(user);
    //   }
    // });
    const id = this.getUserFromCookie()?.id;
    if (id) {
      this.buscarUsuarioPorId(id).then((user) => {
        if (user) {
          this.authState$?.next(user);
        }
      });
    }
  }
  

  getUserFromCookie(): { id: number } | undefined {
    const cookieContent = this.cookieS.get('user');

    if (cookieContent) {
      try {
        const jIndex = cookieContent.indexOf('j:');
        if (jIndex !== -1) {
          const jsonString = cookieContent.substring(jIndex + 2);
          const endIndex = jsonString.indexOf('"}');

          if (endIndex !== -1) {
            const jsonSubstring = jsonString.substring(0, endIndex + 2);
            try {
              const parsedJson = JSON.parse(jsonSubstring);
              const userId = parsedJson.id;
              return { id: userId };
            } catch (error) {
              console.error('Error al analizar JSON de la cookie:', error);
            }
          } else {
            console.error('No se encontró \'"}\' en la cadena de la cookie');
          }
        } else {
          console.error('No se encontró \'j:\' en la cadena de la cookie');
        }
      } catch (err) {
        console.log(err);
      }
    }

    return undefined;
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
        const userCredential = await axios.post(`${this.userUrl}`, user);
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
      const res = await axios.post(`${this.userUrl}/logout`, {}, { withCredentials: true });
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

async isUserLoggedIn(): Promise< User | null> {
  try {
      const res = await fetch (`${this.userUrl}/auth`, { credentials: 'include' });
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

async buscarUsuarioPorId(id: number): Promise<User | null> {
  try {
      const res = await fetch (`${this.userUrl}/${id}`);
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
