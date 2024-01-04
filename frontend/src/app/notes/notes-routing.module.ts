import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNotesComponent } from './components/list-notes/list-notes.component';
import { NewNoteComponent } from './components/new-note/new-note.component';

const routes: Routes = [
  { path: '', component: ListNotesComponent  },
  { path: 'nueva-nota', component: NewNoteComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
