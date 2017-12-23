import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesServerService } from '../notes-server.service';
import { Note } from '../notes/notes.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.css']
})
export class ViewSectionComponent implements OnInit {

  section: string;
  notes: Note[];

  constructor(private route: ActivatedRoute, private notesServer: NotesServerService) { }

  ngOnInit() {
    this.section = this.route.snapshot.params["name"];
    this.getNotes().subscribe(notes => this.notes = notes);
  }

  getNotes(): Observable<Note[]> {
    return this.notesServer.getNotes(this.section);
  }

}
