import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'notes-list', loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule) },
    { path: 'categories-list', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
    { path: 'register', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    
];

