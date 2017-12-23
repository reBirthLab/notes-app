import { Component, OnChanges, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnChanges {

  private notesUrl = 'http://localhost:8080/notes';

  notes: Note[];
  text: string;

  @Input()
  section: string;

  constructor(private http: HttpClient) {
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
    let params: HttpParams = new HttpParams();
    params = params.append('section', this.section);
    return this.http.get<Note[]>(this.notesUrl, { params });
  }

}

interface Note {
  text: string;
  section: string;
}
