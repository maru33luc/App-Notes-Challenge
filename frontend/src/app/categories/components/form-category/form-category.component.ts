import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../interfaces/Category';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-category.component.html',
  styleUrl: './form-category.component.css'
})
export class FormCategoryComponent {

  @Input() nombre?: string;
  @Input() descripcion?: string;
  @Output() sendCategory = new EventEmitter<Category>()

  constructor(private formBuilder: FormBuilder) {}

  categoryForm: FormGroup = this.formBuilder.group({
    nombre: ['',[Validators.required, Validators.maxLength(50)]],
    descripcion: ['',[ Validators.maxLength(500)]],
  });

  ngOnChanges(): void { 
    this.categoryForm.controls['nombre'].setValue(this.nombre);
    this.categoryForm.controls['descripcion'].setValue(this.descripcion);
  }

  emitCategory() {
    if(this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
    } else {
      const category: Category = {
        nombre: this.categoryForm.value.nombre,
        descripcion: this.categoryForm.value.descripcion,
      }
      this.sendCategory.emit(category);
    }
  }

}
