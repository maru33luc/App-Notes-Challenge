import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router'
import { Category } from '../../../interfaces/Category';

import { FormCategoryComponent } from '../form-category/form-category.component';

@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [FormCategoryComponent],
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})
export class NewCategoryComponent {

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  saveCategory(category: Category) {
      this.categoryService.createCategory(category);
      this.router.navigate(['/categories-list']);
    }
  
}
