import { Component, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NotesServerService } from '../../services/notes-server.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnChanges {

  notes: Note[];
  text: string;

  @Input()
  section: string;

  constructor(private notesServer: NotesServerService) {
  }

  ngOnChanges() {
    this.getNotes().subscribe(notes => this.notes = notes);
  }

  add() {
    let note: Note = {
      text: this.text,
      section: this.section
    }
    this.notes.push(note);
    this.text = "";
  }

  remove(idx) {
    this.notes.splice(idx, 1)
  }

  getNotes(): Observable<Note[]> {
    return this.notesServer.getNotes(this.section);
  }

}

export interface Note {
  text: string;
  section: string;
}
