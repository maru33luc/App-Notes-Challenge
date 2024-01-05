import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'notes', loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule) },
    { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
    { path: '**', redirectTo: 'notes', pathMatch: 'full'}
];
