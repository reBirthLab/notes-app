import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Note } from '../notes/notes.component';

import { NotesServerService } from '../../services/notes-server.service';

@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.css']
})
export class ViewSectionComponent implements OnInit {

  section: string;
  notes: Note[];
  notes$: Observable<Note[]>;

  constructor(private route: ActivatedRoute, private notesServer: NotesServerService) { }

  ngOnInit() {
    this.section = this.route.snapshot.params['name'];
    this.notes$ = this.getNotes();
  }

  getNotes(): Observable<Note[]> {
    return this.notesServer.getNotes(this.section);
  }

}
