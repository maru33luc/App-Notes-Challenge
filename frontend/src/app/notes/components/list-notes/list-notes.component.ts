import { Component } from '@angular/core';
import { Note } from '../../../interfaces/Note';
import { NoteService } from '../../../services/note.service';
import { CategoryService } from '../../../services/category.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrl: './list-notes.component.css'
})
export class ListNotesComponent {
  filteredNotes: Note[] | undefined = [];
  notes: Note[] | undefined = [];
  searchTitle: string = '';
  startDate: Date | undefined;
  endDate: Date | undefined;
  order?: string;
  orderDirection?: string;
  loading: boolean = false;
  userId?: number;

  constructor(private noteService: NoteService,
    private categoryService: CategoryService, private cookieS: CookieService, private loginService: LoginService) {

    this.loginService.authState$?.subscribe((user) => {
      if (user) {
        
        this.userId = user.id;
        this.noteService.getActiveNotes(user.id).then(notes => {
          if (notes) {
            this.notes = notes;
            if (Array.isArray(this.notes)) {
              this.filteredNotes = [...(this.notes ?? [])];
              for (let note of this.filteredNotes) {
                this.categoryService.getCategoryName(note.categoriaId).then((category) => {
                  if (category) {
                    note.categoria = category;
                  }
                });
              }
              this.loading = true;
            } else {
              this.filteredNotes = [];
              this.loading = true;
            }
          }
        });
      } else{
        this.loading = true;
      }
    });
  }

  filterNotesByDates() {
    if (this.startDate || this.endDate) {
      this.filteredNotes = this.filteredNotes?.filter(note =>
        (note.createdAt && new Date(note.createdAt) >= new Date(this.startDate!)) &&
        (note.createdAt && new Date(note.createdAt) <= new Date(this.endDate!))
      );
    }
  }

  applyTitleFilter() {
    this.filteredNotes = this.filteredNotes?.filter(note => note.title.toLowerCase().includes(this.searchTitle.toLowerCase()));
  }

  applyOrderFilter() {
    if (this.order === 'Titulo') {
      this.filteredNotes = this.filteredNotes?.sort((a, b) => {
        if (a.title && b.title) {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    } else {
      this.filteredNotes = this.filteredNotes?.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return 0;
      });
    }
  }

  applyOrderDirectionFilter() {
    if (this.orderDirection === 'asc') {
      this.filteredNotes = this.filteredNotes?.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return 0;
      });
    } else if (this.orderDirection === 'desc') {
      this.filteredNotes = this.filteredNotes?.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
      });
    }
  }

  applyFilter() {
    this.filterNotesByDates();
    this.applyTitleFilter();
    this.applyOrderFilter();
    this.applyOrderDirectionFilter();
  }

  deleteNote(id: number | undefined) {
    try {
      this.noteService.deleteNotes(id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  fileNote(id: number | undefined) {
    try {
      this.noteService.fileNote(id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async clearFilters() {
    const res = await this.noteService.getActiveNotes(this.userId);
    if (res) {
      this.notes = res;
    }
    this.searchTitle = '';
    this.startDate = undefined;
    this.endDate = undefined;
    this.order = undefined;
    this.orderDirection = undefined;
    if (Array.isArray(this.notes)) {
      this.filteredNotes = [...(this.notes ?? [])];

    }else{
      this.filteredNotes = [];
    }
  }

}
