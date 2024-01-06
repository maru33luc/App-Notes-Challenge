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
  archivedNotes: Note[] = []; 
  searchTitle: string = ''; 
  startDate: Date | undefined;
  endDate: Date | undefined;

  constructor(private noteService: NoteService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.noteService.$inactiveNotes.subscribe(async notes => {
      this.archivedNotes = notes;
      if (this.archivedNotes) {
        for (let note of this.archivedNotes) {
          note.categoria = await this.categoryService.getCategoryName(note.categoriaId);
        }
      }
    });
  }

  async getArchivedNotes() {
    const notes = await this.noteService.getInactiveNotes();
    if(notes){
      for ( let note of notes) {
        note.categoria = await this.categoryService.getCategoryName(note.categoriaId);
      }
    }
    
    this.archivedNotes = notes || []; 
  }

  filterArchivedNotes() {
    if (this.startDate && this.endDate) {
      this.archivedNotes = this.archivedNotes.filter(note =>
        (note.createdAt && new Date(note.createdAt) >= new Date(this.startDate!)) &&
        (note.createdAt && new Date(note.createdAt) <= new Date(this.endDate!))
      );
    }
  }

  restoreNote(noteId: number | undefined) {
    if (noteId) {
      this.noteService.restoreNoteById(noteId);
      window.location.reload();
    }
  }

  applyFilter() {
    this.archivedNotes = this.archivedNotes.filter(note => note.title.toLowerCase().includes(this.searchTitle.toLowerCase()));
    this.filterArchivedNotes();
  }

  clearFilters() {
    this.searchTitle = '';
    this.startDate = undefined;
    this.endDate = undefined;
    this.getArchivedNotes();
  }
}
