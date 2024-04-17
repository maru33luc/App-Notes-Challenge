import { Component } from '@angular/core';
import { NewCategoryComponent } from '../../components/new-category/new-category.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-new-category-pages',
  standalone: true,
  imports: [ HeaderComponent, NewCategoryComponent],
  templateUrl: './new-category-pages.component.html',
  styleUrl: './new-category-pages.component.css'
})
export class NewCategoryPagesComponent {

}
