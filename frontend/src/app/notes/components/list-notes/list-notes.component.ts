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
  // Signals
  notes = this.noteService.$notes; // Todas las notas
  activeNotes = this.noteService.$activeNotes; // Notas activas
  userId = signal<number | null>(null);

  // Filtros
  searchTitle = signal<string>('');
  startDate = signal<Date | undefined>(undefined);
  endDate = signal<Date | undefined>(undefined);
  order = signal<string | undefined>(undefined);
  orderDirection = signal<string | undefined>(undefined);

  // Computed signal para notas filtradas
  filteredNotes = computed(() => {
    let filtered = this.activeNotes();

    // Filtro por título
    const search = this.searchTitle().toLowerCase();
    if (search) {
      filtered = filtered.filter((note) =>
        note.title?.toLowerCase().includes(search)
      );
    }

    // Filtro por fechas
    const start = this.startDate();
    const end = this.endDate();
    if (start || end) {
      filtered = filtered.filter((note) => {
        const createdAt = note.createdAt ? new Date(note.createdAt) : null;
        return (
          (!start || (createdAt && createdAt >= start)) &&
          (!end || (createdAt && createdAt <= end))
        );
      });
    }

    // Ordenamiento
    const order = this.order();
    const orderDirection = this.orderDirection();
    if (order === 'Titulo') {
      filtered = filtered.sort((a, b) =>
        a.title && b.title ? a.title.localeCompare(b.title) : 0
      );
    } else if (order === 'Fecha') {
      filtered = filtered.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateA - dateB;
      });
    }

    // Dirección del ordenamiento
    if (orderDirection === 'desc') {
      filtered = filtered.reverse();
    }

    return filtered;
  });

  loading = signal<boolean>(false);

  constructor(
    private noteService: NoteService,
    private categoryService: CategoryService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loading.set(true);
    this.loginService.isUserLoggedIn().then((user) => {
      if (user) {
        this.userId.set(user.id ?? null);
        this.noteService.getActiveNotes(user.id);
      }
      this.loading.set(false);
    });

    this.noteService.getNotes(); // Opcional, si necesitas cargar todas las notas
  }

  // Métodos
  applyFilter(): void {
    // La reactividad de las signals hace que este método sea opcional
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
