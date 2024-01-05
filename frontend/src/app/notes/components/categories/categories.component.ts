import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../interfaces/Category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  async loadCategories(): Promise<void> {
    this.categories = await this.categoryService.getCategories();
  }

  editCategory(category: Category): void {
    
  }

  deleteCategory(categoryId: number | undefined): void {
    if (categoryId) {
      console.log('categoryId', categoryId);
      this.categoryService.deleteCategory(categoryId);
      this.loadCategories();
    }
  }
}
