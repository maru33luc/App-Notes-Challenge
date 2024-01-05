import { Component, OnInit } from '@angular/core';
import { Note } from '../../../interfaces/Note';
import { NoteService } from '../../../services/note.service';
import { CategoryService } from '../../../services/category.service';


@Component({
  selector: 'app-archivo',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchivoComponent implements OnInit {
  archivedNotes: Note[] = []; // Lista de notas archivadas
  searchTitle: string = ''; // Para filtrar por título
  startDate: Date | undefined;
  endDate: Date | undefined;

  constructor(private noteService: NoteService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.getArchivedNotes();
  }

  async getArchivedNotes() {
    const notes = await this.noteService.getInactiveNotes();
    for ( let note of notes? notes: []) {
        const res = await this.categoryService.getCategoryName(note.categoriaId);
        if(res){
          note.categoria = res;
        }
    }
    this.archivedNotes = notes || []; 
  }

  filterArchivedNotes() {
    if (this.startDate && this.endDate) {
      console.log('startDate', this.startDate);
      console.log('endDate', this.endDate);
      this.archivedNotes = this.archivedNotes.filter(note =>
        (note.createdAt && new Date(note.createdAt) >= new Date(this.startDate!)) &&
        (note.createdAt && new Date(note.createdAt) <= new Date(this.endDate!))
      );
    }
  }

  restoreNote(noteId: number | undefined) {
    // Lógica para restaurar la nota según su ID
    console.log(`Restaurar nota con ID: ${noteId}`);
  }

  applyFilter() {
    // Filtrar las notas archivadas según el título
    this.archivedNotes = this.archivedNotes.filter(note => note.title.toLowerCase().includes(this.searchTitle.toLowerCase()));
    this.filterArchivedNotes();
  }
}
