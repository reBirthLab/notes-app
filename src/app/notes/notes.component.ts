import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  private notesUrl = 'http://localhost:8080/notes';

  notes: Note[];
  text: string;

  constructor(private http: HttpClient) {
    this.getNotes().subscribe(notes => this.notes = notes);
  }

  ngOnInit() {
  }

  add() {
    let note: Note = {
      text: this.text
    }
    this.notes.push(note);
    this.text = "";
  }

  remove(idx) {
    this.notes.splice(idx, 1)
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl);
  }

}

interface Note {
  text: string;
}
