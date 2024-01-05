import { Component } from '@angular/core';
import { NoteService } from '../../../services/note.service';
import { Note } from '../../../interfaces/Note';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.css'
})
export class EditNoteComponent {

  title?: string;
  content?: string;
  categoriaId?: number;
  
  constructor(private noteService: NoteService, 
     private route: ActivatedRoute, private router: Router)
   { }

   ngOnInit () {
    this.route.params.subscribe(async (params) => {
      const id = params['id'];
            try {
                const response = await this.noteService.getNoteById(id);
                if (response) {
                    this.title = response.title;
                    this.content = response.content;
                    this.categoriaId = response.categoriaId;
                }
            } catch (e) {
                console.log(e);
            }
   });
  }

  sendData(note: Note) {
    try{
      this.noteService.updateNote(note, this.route.snapshot.params['id']);
      this.router.navigate(['/notes']);
    }catch(error){
      console.log(error);
    }
  }
}
