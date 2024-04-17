import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Note } from '../../../interfaces/Note';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-notes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  templateUrl: './form-notes.component.html',
  styleUrl: './form-notes.component.css'
})
export class FormNotesComponent {

  @Input() title?: string;
  @Input() content?: string;
  @Input() categoriaId?: number;

  categories: any[] = [];
  @Output() sendNote = new EventEmitter<Note>()

  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService) {}

  newNoteForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    content: ['', [Validators.required, Validators.maxLength(500)]],
    categoriaId: ['', [Validators.required]],
  });

  obtenerCategorias = async () => {
    this.categories = await this.categoryService.getCategories();
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  ngOnChanges(): void { 
    this.newNoteForm.controls['title'].setValue(this.title);
    this.newNoteForm.controls['content'].setValue(this.content);
    this.newNoteForm.controls['categoriaId'].setValue(this.categoriaId);
  }

  sendData() {
    if(this.newNoteForm.invalid) {
      this.newNoteForm.markAllAsTouched();
    } else {
      const note: Note = {
        title: this.newNoteForm.value.title,
        content: this.newNoteForm.value.content,
        categoriaId: this.newNoteForm.value.categoriaId,
        usuarioId: 1,
      }
      this.sendNote.emit(note);
    }
  }
}
