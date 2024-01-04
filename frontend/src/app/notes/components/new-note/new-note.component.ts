import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent {
  categories: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService) {}

  newNoteForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    content: ['', [Validators.required, Validators.maxLength(500)]],
    categoriaId: ['', [Validators.required]],
  });

  obtenerCategorias = async () => {
    this.categories = await this.categoryService.getCategories();
    console.log(this.categories);
  }

  ngOnInit(): void {

    this.obtenerCategorias();
  }

  onSubmit() {
    if (this.newNoteForm && this.newNoteForm.valid) {
      // Lógica para guardar la nueva nota
      console.log('Formulario válido, guardando nota:', this.newNoteForm.value);
    } else {
      // Lógica para manejar el formulario no válido
      console.log('Formulario no válido. Revise los campos.');
    }
  }
}
