import { Component } from '@angular/core';
import { EditCategoryComponent } from '../../components/edit-category/edit-category.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-edit-category-page',
  standalone: true,
  imports: [ HeaderComponent, EditCategoryComponent],
  templateUrl: './edit-category-page.component.html',
  styleUrl: './edit-category-page.component.css'
})
export class EditCategoryPageComponent {

}
