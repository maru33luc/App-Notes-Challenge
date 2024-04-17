import { Note } from './interfaces/Note';
import { Routes } from '@angular/router';
import { NewNotePageComponent } from './notes/pages/new-note-page/new-note-page.component';
import { EditNotePageComponent } from './notes/pages/edit-note-page/edit-note-page.component';
import { ArchivePageComponent } from './notes/pages/archive-page/archive-page.component';
import { NewCategoryPagesComponent } from './categories/pages/new-category-page/new-category-pages.component';
import { EditCategoryPageComponent } from './categories/pages/edit-category-page/edit-category-page.component';
import { NewNoteComponent } from './notes/components/new-note/new-note.component';

export const routes: Routes = [
    {
        path: 'notes-list', loadChildren: () => import('./notes/routes').then(m => m.notesRoutes)
    },
    {
        path: 'categories-list', loadChildren: () => import('./categories/routes').then(m => m.categoriesRoutes)
    },
    {
        path: 'register', loadComponent: () => import('./auth/pages/register-page/register-page.component').then(m => m.RegisterPageComponent)
    },
    {
        path: 'login', loadComponent: () => import('./auth/pages/login-page/login-page.component').then(m => m.LoginPageComponent)
    },
    { path: '**', redirectTo: 'notes-list', pathMatch: 'full' }
    
];

