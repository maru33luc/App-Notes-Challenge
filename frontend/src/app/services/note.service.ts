import { Injectable } from '@angular/core';
import { Note } from '../interfaces/Note';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  $notes: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);

  constructor() {
    this.getActiveNotes().then(notes => {
      if (notes) {
        this.$notes.next(notes);
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
      const res = await fetch('http://localhost:3000/notes/status/1');
      return await res.json();
    } catch (err) {
      console.log(err);
    }
    return undefined;
  }

  async getInactiveNotes(): Promise<Note[] | undefined> {
    try {
      const res = await fetch('http://localhost:3000/notes/status/0');
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
}
