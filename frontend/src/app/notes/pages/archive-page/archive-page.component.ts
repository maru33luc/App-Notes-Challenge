import { Component } from '@angular/core';
import { ArchivoComponent } from '../../components/archive/archive.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-archive-page',
  standalone: true,
  imports: [HeaderComponent, ArchivoComponent],
  templateUrl: './archive-page.component.html',
  styleUrl: './archive-page.component.css'
})
export class ArchivePageComponent {

}
