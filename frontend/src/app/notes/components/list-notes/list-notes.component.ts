import { Component } from '@angular/core';
import { Note } from '../../../interfaces/Note';
import { NoteService } from '../../../services/note.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrl: './list-notes.component.css'
})
export class ListNotesComponent {
  filteredNotes : Note[] | undefined = [];
  notes : Note[] | undefined = [];
  searchTitle: string = ''; // Para filtrar por título
  startDate: Date | undefined;
  endDate: Date | undefined;
  order?: string ;	
  orderDirection?: string;
  
  constructor(private noteService: NoteService,
    private categoryService: CategoryService) { }
    
  async ngOnInit(): Promise<void> {
    this.noteService.$notes.subscribe(async notes => {
      this.notes = notes;
      if (this.notes) {
        for (let note of this.notes) {
          note.categoria = await this.categoryService.getCategoryName(note.categoriaId);  
        }
        this.filteredNotes = [...this.notes];
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
      if(this.order === 'Titulo'){
        // ordenar por titulo de forma asc
        this.filteredNotes = this.filteredNotes?.sort((a, b) => {
          if (a.title && b.title) {
            return a.title.localeCompare(b.title);
          }
          return 0;
        });
      }else{
        //ordenar por fecha de forma asc
        this.filteredNotes = this.filteredNotes?.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          }
          return 0;
        });
      }
  }

  applyOrderDirectionFilter() {
    if(this.orderDirection === 'asc'){
      // ordenar por fechas de forma asc
      this.filteredNotes = this.filteredNotes?.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return 0;
      });
    }else if(this.orderDirection === 'desc'){
      // ordenar por fechas de forma desc
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
    try{
      this.noteService.deleteNotes(id);
      window.location.reload();
    }catch(error){
      console.log(error);
    }
  }

  fileNote (id: number | undefined) {
    try{
      this.noteService.fileNote(id);
      window.location.reload();
    }catch(error){
      console.log(error);
    }
  }

  async clearFilters () {
    const res = await  this.noteService.getActiveNotes();
    if(res){
      this.notes = res;
    }
    this.searchTitle = '';
    this.startDate = undefined;
    this.endDate = undefined;
    this.order = undefined;
    this.orderDirection = undefined;

    this.filteredNotes = [...(this.notes ?? [])];
  }

}
