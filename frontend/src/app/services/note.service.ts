import { User } from './../interfaces/User';
import { Injectable, signal } from '@angular/core';
import { Note } from '../interfaces/Note';
import { BehaviorSubject, Subject } from 'rxjs';
import { environments } from '../../environments/environments';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  inactiveNotes = signal<Note[]>([]);
  activeNotes = signal<Note[]>([]);
  notesUrl = environments.urlBackNotes;
  userId = signal<number | null>(null);

  constructor(private loginService: LoginService) {
    this.loginService.isUserLoggedIn().then(user => {
      if (user) {
        this.userId.set(user.id ?? null);
        this.getActiveNotes(this.userId());
      }else{
        this.userId.set(null);
      }
    });
  }

  async getActiveNotes (id: number | null) {
    if (!id) return;
    try {
      const res = await fetch(`${this.notesUrl}/${id}/status/1`);
      if (res.ok) {
        const activeNotes = await res.json();
        this.activeNotes.set(activeNotes);
      }
    } catch (err) {
      console.error('Error fetching active notes:', err);
    }
  }

  async getInactiveNotes (id: number | undefined): Promise<Note[] | undefined> {
    if (!id) return undefined;
    try {
      const res = await fetch(`${this.notesUrl}/${id}/status/0`);
      if (res.ok) {
        const inactiveNotes = await res.json();
        this.inactiveNotes.set(inactiveNotes);
        return inactiveNotes;
      }
    } catch (err) {
      console.error('Error fetching inactive notes:', err);
    }
    return undefined;
  }

  async createNote(note: Note) {
    try {
      await fetch(`${this.notesUrl}`, {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const userId = this.userId();
    if (userId) {
      await this.getActiveNotes(userId);
    }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteNotes(id: number | undefined){
    try {
      await fetch(`${this.notesUrl}/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.log(err);
    }
  }

  async updateNote(note: Note, id: number) {
    try {
      await fetch(`${this.notesUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(note),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.getActiveNotes(this.userId());

    } catch (err) {
      console.log(err);
    }
  }

  async getNoteById(id: number): Promise<Note | undefined> {
    try {
      const res = await fetch(`${this.notesUrl}/${id}`);
      if(res){
        return await res.json();
      }
    } catch (err) {
      console.log(err);
    }
    return undefined;
  }

  async fileNote(id: number | undefined): Promise<void> {
    try {
      await fetch(`${this.notesUrl}/${id}`, {
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
      await fetch(`${this.notesUrl}/${id}`, {
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
