import { Component, signal, computed, OnInit } from '@angular/core';
import { Note } from '../../../interfaces/Note';
import { NoteService } from '../../../services/note.service';
import { CategoryService } from '../../../services/category.service';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-notes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterLink,
  ],
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css'],
})

export class ListNotesComponent implements OnInit {
  activeNotes = computed(() => this.noteService.activeNotes());
  userId = signal<number | null>(null);

  searchTitle = signal<string>('');
  startDate = signal<Date | undefined>(undefined);
  endDate = signal<Date | undefined>(undefined);
  order = signal<string | undefined>(undefined);
  orderDirection = signal<string | undefined>(undefined);

  filteredNotes = computed(() => {
    const titleFilter = this.searchTitle().toLowerCase();
    const start = this.startDate();
    const end = this.endDate();
    const order = this.order();
    const direction = this.orderDirection();
    let filtered = computed(() => this.activeNotes())();

    // Filtro por título
    if (titleFilter) {
      filtered = filtered.filter(note =>
        note.title?.toLowerCase().includes(titleFilter)
      );
    }

    // Filtro por fechas
    if (start || end) {
      filtered = filtered.filter(note => {
        const createdAt = new Date(note.createdAt ?? '');
        return (
          (!start || createdAt >= new Date(start)) &&
          (!end || createdAt <= new Date(end))
        );
      });
    }

    // Ordenamiento
    if (order) {
      filtered = filtered.sort((a, b) => {
        if (order === 'title') {
          const comparison = (a.title ?? '').localeCompare(b.title ?? '');
          return direction === 'desc' ? -comparison : comparison;
        } else if (order === 'createdAt') {
          const comparison =
            new Date(a.createdAt ?? '').getTime() -
            new Date(b.createdAt ?? '').getTime();
          return direction === 'desc' ? -comparison : comparison;
        }
        return 0;
      });
    }
    filtered = filtered.map(note => {
      if (note.categoriaId) {
        this.categoryService.getCategoryName(note.categoriaId).then(categoria => {
          note.categoria = categoria;
        });
      }
      return note;
    });
    return filtered;
  });

  loading = signal<boolean>(false);

  constructor(
    private noteService: NoteService,
    private categoryService: CategoryService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loading.set(true);
    this.loginService.isUserLoggedIn().then(user => {
      if (user) {
        this.userId.set(user.id ?? null);
        this.activeNotes = computed(() => this.noteService.activeNotes());
      } else {
        this.userId.set(null);
      }
      this.loading.set(false);
    });

    this.noteService.getActiveNotes(this.userId())
  }

  ngOnChanges(): void {
    const userId = this.userId();
    if (userId) {
      this.noteService.getActiveNotes(userId);
    }
  }


  clearFilters(): void {
    this.searchTitle.set('');
    this.startDate.set(undefined);
    this.endDate.set(undefined);
    this.order.set(undefined);
    this.orderDirection.set(undefined);
  }

  deleteNote(id: number | undefined): void {
    if (!id) return;
    this.noteService.deleteNotes(id).then(() => {
      const userId = this.userId();
      if (userId) {
        this.noteService.getActiveNotes(userId);
      }
    });
  }

  fileNote(id: number | undefined): void {
    if (!id) return;
    this.noteService.fileNote(id).then(() => {
      const userId = this.userId();
      if (userId) {
        this.noteService.getActiveNotes(userId);
      }
    });
  }
}
