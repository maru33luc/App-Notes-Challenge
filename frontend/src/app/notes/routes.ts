import { Routes } from "@angular/router";

export const notesRoutes: Routes = [
    { path: '', loadComponent: () => import('./pages/list-notes-page/list-notes-page.component').then(m => m.ListNotesPageComponent)},
    { path: 'nueva-nota', loadComponent: () => import('./pages/new-note-page/new-note-page.component').then(m => m.NewNotePageComponent)},
    { path: 'editar-nota/:id', loadComponent: () => import('./pages/edit-note-page/edit-note-page.component').then(m => m.EditNotePageComponent)},
    { path: 'archive', loadComponent: () => import('./pages/archive-page/archive-page.component').then(m => m.ArchivePageComponent)},
    { path: '**', redirectTo: 'notes-list' }

]