import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Note } from '../components/notes/notes.component';

@Injectable()
export class NotesServerService {

  private notesUrl = 'http://localhost:8080/api/notes';

  constructor(private http: HttpClient) { }

  getNotes(section: string): Observable<Note[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('section', section);
    return this.http.get<Note[]>(this.notesUrl, { params });
  }

}
