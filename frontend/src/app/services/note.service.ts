import { Injectable } from '@angular/core';
import { Note } from '../interfaces/Note';
import { BehaviorSubject, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  $notes: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
  $inactiveNotes: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);

  constructor(private cookieS : CookieService) {
    this.getActiveNotes().then(notes => {
      if (notes) {
        this.$notes.next(notes);
      }
    });
    this.getInactiveNotes().then(notes => {
      if (notes) {
        this.$inactiveNotes.next(notes);
      }
    });
  }

  async getNotes(): Promise<Note[] | undefined> {
    try {
      const res = await fetch('http://localhost:3000/notes');
      return await res.json();
    } catch (err) {
      console.log(err);
    }
    return undefined;
  }

  async getActiveNotes(): Promise<Note[] | undefined> {
    try {
      const cookieContent = this.cookieS.get('user');
      
      // Busca la posición de "j:" en la cadena
    const jIndex = cookieContent.indexOf('j:');

    // Verifica si se encontró "j:" en la cadena
    if (jIndex !== -1) {
      // Ajusta el índice para comenzar después de "j:" y encuentra la posición del siguiente comillas
      const jsonString = cookieContent.substring(jIndex + 2);
      const endIndex = jsonString.indexOf('"}');

      // Verifica si se encontró '"}' en la cadena
      if (endIndex !== -1) {
        // Extrae la porción del JSON y analízala
        const jsonSubstring = jsonString.substring(0, endIndex + 2);
        try {
          const parsedJson = JSON.parse(jsonSubstring);

          // Ahora `parsedJson` contiene el objeto JSON
          console.log('Contenido JSON:', parsedJson);

          const userId = parsedJson.id
          console.log('userId', userId);
      const res = await fetch(`http://localhost:3000/notes/${userId}/status/1`);
      const response = await res.json();
      console.log(response);
      return response;
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
    return undefined;
  }

  async getInactiveNotes(): Promise<Note[] | undefined> {
    try {
      const userId = 1
      const res = await fetch(`http://localhost:3000/notes/${userId}/status/0`);
      return await res.json();
    } catch (err) {
      console.log(err);
    }
    return undefined;
  }

  async createNote(note: Note): Promise<void> {
    try {
      await fetch(`http://localhost:3000/notes`, {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  async deleteNotes(id: number | undefined): Promise<void> {
    try {
      await fetch(`http://localhost:3000/notes/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.log(err);
    }
  }

  async updateNote(note: Note, id: number): Promise<void> {
    try {
      await fetch(`http://localhost:3000/notes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(note),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getNoteById(id: number): Promise<Note | undefined> {
    try {
      const res = await fetch(`http://localhost:3000/notes/${id}`);
      return await res.json();
    } catch (err) {
      console.log(err);
    }
    return undefined;
  }

  async fileNote(id: number | undefined): Promise<void> {
    try {
      await fetch(`http://localhost:3000/notes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          activa: 0,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  async restoreNoteById(id: number | undefined): Promise<void> {
    try {
      await fetch(`http://localhost:3000/notes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          activa: 1,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}
