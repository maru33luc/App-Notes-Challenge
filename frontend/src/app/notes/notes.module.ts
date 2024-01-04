import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { ListNotesComponent } from './components/list-notes/list-notes.component';
import { NewNoteComponent } from './components/new-note/new-note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListNotesComponent, NewNoteComponent],
  imports: [
    CommonModule,
    NotesRoutingModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe]
})
export class NotesModule { }
