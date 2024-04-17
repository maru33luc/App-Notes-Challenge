import { Component } from '@angular/core';
import { NewNoteComponent } from '../../components/new-note/new-note.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-new-note-page',
  standalone: true,
  imports: [NewNoteComponent, HeaderComponent],
  templateUrl: './new-note-page.component.html',
  styleUrl: './new-note-page.component.css'
})
export class NewNotePageComponent {

}
