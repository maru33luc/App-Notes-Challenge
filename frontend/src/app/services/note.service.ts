import { Injectable } from '@angular/core';
import { Note } from '../interfaces/Note';
import { BehaviorSubject, Subject } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  $notes: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
  $inactiveNotes: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
  notesUrl = environments.urlBackNotes;

  constructor() {}

  async getNotes(): Promise<Note[] | undefined> {
    try {
      const res = await fetch(this.notesUrl);
      return await res.json();
    } catch (err) {
      console.log(err);
    }
    return undefined;
  }

  async getActiveNotes (id: number | undefined): Promise<Note[] | undefined> {
    try {
      const res = await fetch(`${this.notesUrl}/${id}/status/1`);
      return await res.json();
    } catch (err) {
      console.log(err);
    }
    return undefined;
  }

  async getInactiveNotes (id: number | undefined): Promise<Note[] | undefined> {
    try {
      const res = await fetch(`${this.notesUrl}/${id}/status/0`);
      return await res.json();
    } catch (err) {
      console.log(err);
    }
    return undefined;
  }

  async createNote(note: Note): Promise<void> {
    try {
      await fetch(`${this.notesUrl}`, {
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
      await fetch(`${this.notesUrl}/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.log(err);
    }
  }

  async updateNote(note: Note, id: number): Promise<void> {
    try {
      await fetch(`${this.notesUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(note),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const notes = await this.getNotes();
      if (notes) {
        this.$notes.next(notes);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getNoteById(id: number): Promise<Note | undefined> {
    try {
      const res = await fetch(`${this.notesUrl}/${id}`);
      return await res.json();
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
