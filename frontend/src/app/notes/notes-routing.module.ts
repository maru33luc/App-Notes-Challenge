import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNotesComponent } from './components/list-notes/list-notes.component';
import { NewNoteComponent } from './components/new-note/new-note.component';
import { NewNotePageComponent } from './pages/new-note-page/new-note-page.component';
import { ListNotesPageComponent } from './pages/list-notes-page/list-notes-page.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';
import { EditNotePageComponent } from './pages/edit-note-page/edit-note-page.component';
import { CategoryListComponent } from '../categories/components/categories/categories.component';
import { CategoriesPageComponent } from '../categories/pages/categories-page/categories-page.component';
import { NewCategoryComponent } from '../categories/components/new-category/new-category.component';
import { ArchivoComponent } from './components/archive/archive.component';
import { ArchivePageComponent } from './pages/archive-page/archive-page.component';

const routes: Routes = [
  { path: '', component: ListNotesPageComponent  },
  { path: 'nueva-nota', component: NewNotePageComponent},
  { path: 'editar-nota/:id', component: EditNotePageComponent},
  { path: 'archive', component: ArchivePageComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
