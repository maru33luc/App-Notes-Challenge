import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { CategoryListComponent } from './components/categories/categories.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { NewCategoryPagesComponent } from './pages/new-category-pages/new-category-pages.component';

const routes: Routes = [
  { path: '', component: CategoriesPageComponent},
  { path: 'nueva-categoria', component: NewCategoryPagesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
