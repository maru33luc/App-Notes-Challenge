import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../interfaces/Category';
import { CommonModule } from '@angular/common';
import { FormCategoryComponent } from '../form-category/form-category.component';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, FormCategoryComponent],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {

  nombre?: string ;
  descripcion?: string; 

  constructor(private categoryService: CategoryService, 
    private router: ActivatedRoute,
    private route: Router) { }

  ngOnInit() {
    this.router.params.subscribe(async (params) => {
      const id = params['id'];
            try {
                const response = await this.categoryService.getCategoryById(id);
                console.log(response);
                if (response) {
                    this.nombre = response.nombre;
                    this.descripcion = response.descripcion;
                }
            } catch (e) {
                console.log(e);
            }
   });
  }

  saveCategory(category: Category) {
    try{
      this.categoryService.updateCategory(category, this.router.snapshot.params['id']);
      this.route.navigate(['categories-list']);
    }catch(error){
      console.log(error);
    }
  }
}
