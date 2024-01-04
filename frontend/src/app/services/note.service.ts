import { Injectable } from '@angular/core';
import { Note } from '../interfaces/Note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() { 

  }

  async getNotes(): Promise<Note[] | undefined> {
    try{
      const res = await fetch('http://localhost:3000/notes');
      return await res.json();
    }catch(err){
      console.log(err);
    }
    return undefined; 
  }
}
