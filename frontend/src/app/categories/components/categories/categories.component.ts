import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../../../interfaces/Category';
import { CategoryService } from '../../../services/category.service';

import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories()
  }

  async loadCategories(): Promise<void> {
    this.categories = await this.categoryService.getCategories();
  }

  editCategory(category: Category): void {
  }

  deleteCategory(categoryId: number | undefined): void {
    if (categoryId) {
      this.categoryService.deleteCategory(categoryId);
    }
  }
}
