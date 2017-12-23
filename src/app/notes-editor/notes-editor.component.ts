import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-editor',
  templateUrl: './notes-editor.component.html',
  styleUrls: ['./notes-editor.component.css']
})
export class NotesEditorComponent implements OnInit {

  title = 'app';
  section: string;

  constructor() { }

  ngOnInit() {
  }

  setSection(section: string) {
    this.section = section;
  }

}
