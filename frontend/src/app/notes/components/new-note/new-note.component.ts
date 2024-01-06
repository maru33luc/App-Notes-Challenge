import { NoteService } from './../../../services/note.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Note } from '../../../interfaces/Note';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent {
  
  constructor(private noteService: NoteService,
    private router: Router) {}

  sendData(note : Note) {
    this.noteService.createNote(note);
    this.router.navigate(['/notes']);
  }
}
