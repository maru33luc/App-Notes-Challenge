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

  notes : Note[] | undefined = [];
  constructor(private noteService: NoteService,
    private categoryService: CategoryService) { }
    
  async ngOnInit(): Promise<void> {
    this.notes = await this.noteService.getNotes();

    if (this.notes) {
      for (let note of this.notes) {
        note.categoria= await this.categoryService.getCategoryName(note.categoriaId);  
      }
    }
  }

  deleteNote(id: number | undefined) {
    try{
      this.noteService.deleteNotes(id);
      window.location.reload();
    }catch(error){
      console.log(error);
    }
  }

  

}
