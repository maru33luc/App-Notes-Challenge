import { NoteService } from './../../../services/note.service';
import { Component, OnInit } from '@angular/core';
import { Note } from '../../../interfaces/Note';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormNotesComponent } from '../form-notes/form-notes.component';

@Component({
  selector: 'app-new-note',
  standalone: true,
  imports: [
    CommonModule,
    NgbModule, FormNotesComponent
  ],
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent {
  
  constructor(private noteService: NoteService,
    private router: Router) {}

  sendData(note : Note) {
    this.noteService.createNote(note);
    this.router.navigate(['/notes-list']);
  }
}
