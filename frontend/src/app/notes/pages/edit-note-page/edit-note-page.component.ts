import { Component } from '@angular/core';
import { EditNoteComponent } from '../../components/edit-note/edit-note.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-edit-note-page',
  standalone: true,
  imports: [EditNoteComponent, HeaderComponent],
  templateUrl: './edit-note-page.component.html',
  styleUrl: './edit-note-page.component.css'
})
export class EditNotePageComponent {

}
