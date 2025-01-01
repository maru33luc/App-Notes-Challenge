import { Component, signal } from '@angular/core';
import { Note } from '../../../interfaces/Note';
import { NoteService } from '../../../services/note.service';
import { CategoryService } from '../../../services/category.service';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-notes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule, RouterLink
  ],
  templateUrl: './list-notes.component.html',
  styleUrl: './list-notes.component.css'
})
export class ListNotesComponent {
  // filteredNotes: Note[] | undefined = [];
  filteredNotes: Observable<Note[]> | undefined;
  notes: Note[] | undefined = [];
  searchTitle: string = '';
  startDate: Date | undefined;
  endDate: Date | undefined;
  order?: string;
  orderDirection?: string;
  loading: boolean = false;
  userId = signal<number | null>(null);

  constructor(private noteService: NoteService,
    private categoryService: CategoryService, private loginService: LoginService) {

      this.loginService.isUserLoggedIn().then(user => {
        console.log(user);

        if (user) {
          console.log(user);

          if (user.id !== undefined) {
            this.userId.set(user.id);

            this.noteService.getActiveNotes(user.id).then(notes => {
              if (notes) {
                this.notes = notes;
                console.log(this.notes);
                if (Array.isArray(this.notes)) {
                  this.filteredNotes = new Observable<Note[]>(observer => {
                    observer.next(this.notes ?? []);
                    observer.complete();
                  });

                  this.loading = true;
                } else {
                  this.filteredNotes = new Observable<Note[]>(observer => {
                    observer.next([]);
                    observer.complete();
                  });
                  this.loading = true;
                }
              }
            });
          }

        } else{
          this.loading = true;

          this.noteService.$notes.subscribe((notes) => {
            this.notes = notes;
            this.filteredNotes = new Observable<Note[]>(observer => {
              observer.next(this.notes ?? []);
              observer.complete();
            });
          });
        }
      });



  }

  ngOnInit(): void {
    // this.noteService.$notes.subscribe((notes) => {
    //   this.notes = notes;
    //   this.filteredNotes = [...(this.notes ?? [])];
    // });

    this.noteService.$notes.subscribe((notes) => {
      this.notes = notes;
      this.filteredNotes = new Observable<Note[]>(observer => {
        observer.next(this.notes ?? []);
        observer.complete();
      });
    });
  }

  filterNotesByDates() {
    if (this.startDate || this.endDate) {
      this.filteredNotes?.subscribe(notes => {
        this.filteredNotes = new Observable<Note[]>(observer => {
          observer.next(notes.filter(note =>
            (note.createdAt && new Date(note.createdAt) >= new Date(this.startDate!)) &&
            (note.createdAt && new Date(note.createdAt) <= new Date(this.endDate!))
          ));
          observer.complete();
        });
      });
    }
  }

  applyTitleFilter() {
    this.filteredNotes?.subscribe(notes => {
      this.filteredNotes = new Observable<Note[]>(observer => {
        observer.next(notes.filter(note => note.title.toLowerCase().includes(this.searchTitle.toLowerCase())));
        observer.complete();
      });
    });
  }

  applyOrderFilter() {
    this.filteredNotes?.subscribe(notes => {
      this.filteredNotes = new Observable<Note[]>(observer => {
        if (this.order === 'Titulo') {
          observer.next(notes.sort((a, b) => {
            if (a.title && b.title) {
              return a.title.localeCompare(b.title);
            }
            return 0;
          }));
        } else {
          observer.next(notes.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
              return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
            return 0;
          }));
        }
        observer.complete();
      });
    });
  }

  applyOrderDirectionFilter() {
    this.filteredNotes?.subscribe(notes => {
      this.filteredNotes = new Observable<Note[]>(observer => {
        if (this.orderDirection === 'asc') {
          observer.next(notes.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
              return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
            return 0;
          }));
        } else if (this.orderDirection === 'desc') {
          observer.next(notes.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
            return 0;
          }));
        }
        observer.complete();
      });
    });
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
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  fileNote(id: number | undefined) {
    try {
      this.noteService.fileNote(id);
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async clearFilters() {
    const id = this.userId();
    if(id){
      this.notes = await this.noteService.getActiveNotes(id);
    }else{
      this.notes = await this.noteService.getNotes();
    }
    this.searchTitle = '';
    this.startDate = undefined;
    this.endDate = undefined;
    this.order = undefined;
    this.orderDirection = undefined;
    if (Array.isArray(this.notes)) {
      this.filteredNotes = new Observable<Note[]>(observer => {
        observer.next(this.notes ?? []);
        observer.complete();
      });

    }else{
      this.filteredNotes = new Observable<Note[]>(observer => {
        observer.next([]);
        observer.complete();
      });
    }
  }

}


