import { Component, OnInit } from '@angular/core';
import { Note } from '../../../interfaces/Note';
import { NoteService } from '../../../services/note.service';
import { CategoryService } from '../../../services/category.service';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-archivo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchivoComponent implements OnInit {
  archivedNotes: Note[] = [];
  searchTitle: string = '';
  startDate: Date | undefined;
  endDate: Date | undefined;
  userId?: number;
  loading: boolean = false;

  constructor(private noteService: NoteService, private categoryService: CategoryService, private loginService:LoginService) {
    const user = this.loginService.authState$();
      if(user){
        this.userId = user.id;
        this.getArchivedNotes();
      }else{
        this.loading = true;
      }

  }

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

    const notes = await this.noteService.getInactiveNotes(this.userId);
    if(notes){
      for ( let note of notes) {
        note.categoria = await this.categoryService.getCategoryName(note.categoriaId);
      }
    }

    this.archivedNotes = notes || [];
    this.loading = true;
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
