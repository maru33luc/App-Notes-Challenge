import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { ListNotesComponent } from './components/list-notes/list-notes.component';
import { NewNoteComponent } from './components/new-note/new-note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormNotesComponent } from './components/form-notes/form-notes.component';
import { NewNotePageComponent } from './pages/new-note-page/new-note-page.component';
import { SharedModule } from '../shared/shared.module';
import { ListNotesPageComponent } from './pages/list-notes-page/list-notes-page.component';
import { EditNotePageComponent } from './pages/edit-note-page/edit-note-page.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';

@NgModule({
  declarations: [ListNotesComponent, NewNoteComponent,
  FormNotesComponent, NewNotePageComponent, ListNotesPageComponent,
EditNotePageComponent, EditNoteComponent],
  imports: [
    CommonModule,
    NotesRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [DatePipe]
})
export class NotesModule { }
