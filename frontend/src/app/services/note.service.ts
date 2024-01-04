import { Injectable } from '@angular/core';
import { Note } from '../interfaces/Note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() {}

  async getNotes(): Promise<Note[] | undefined> {
    try {
      const res = await fetch('http://localhost:3000/notes');
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
}
