import { Routes } from "@angular/router";

export const categoriesRoutes: Routes = [
    { path: '', loadComponent: () => import('../categories/pages/categories-page/categories-page.component').then(m => m.CategoriesPageComponent) },
    { path: 'nueva-categoria', loadComponent: () => import('../categories/pages/new-category-page/new-category-pages.component').then(m => m.NewCategoryPagesComponent) },
    { path: 'editar-categoria/:id', loadComponent: () => import('../categories/pages/edit-category-page/edit-category-page.component').then(m => m.EditCategoryPageComponent) },
    { path: '**', redirectTo: 'categories-list' }

];