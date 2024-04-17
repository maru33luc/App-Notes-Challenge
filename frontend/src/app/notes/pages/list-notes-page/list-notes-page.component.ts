import { Component } from '@angular/core';
import { ListNotesComponent } from '../../components/list-notes/list-notes.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-list-notes-page',
  standalone: true,
  imports: [ListNotesComponent, HeaderComponent],
  templateUrl: './list-notes-page.component.html',
  styleUrl: './list-notes-page.component.css'
})
export class ListNotesPageComponent {

}
