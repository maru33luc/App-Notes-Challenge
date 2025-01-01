
import { Component } from '@angular/core';
import { CategoryListComponent } from '../../components/categories/categories.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';


@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [HeaderComponent, CategoryListComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css'
})
export class CategoriesPageComponent {

}
