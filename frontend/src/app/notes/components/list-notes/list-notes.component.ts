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

  // notes: any[] = [
  //   {
  //     id: 1,
  //     title: 'Note 1',
  //     content : 'Content 1',
  //     createdAt : '2021-01-01T00:00:00.000Z',
  //   },
  //   {
  //     id: 2,
  //     title: 'Note 2',
  //     content : 'Content 2',
  //     createdAt : '2021-01-01T00:00:00.000Z',
  //   },
  //   {
  //     id: 3,
  //     title: 'Note 3',
  //     content : 'Content 3',
  //     createdAt : '2021-01-01T00:00:00.000Z',
  //   }
  // ];
    
  async ngOnInit(): Promise<void> {
    this.notes = await this.noteService.getNotes();
    console.log(this.notes);

    if (this.notes) {
      for (let note of this.notes) {
       
        note.categoria= await this.categoryService.getCategoryName(note.categoriaId);  
       
        console.log(note);
      }
    }
  }

  

}
