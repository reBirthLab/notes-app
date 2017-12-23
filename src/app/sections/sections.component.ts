import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

  private sectionUrl = 'http://localhost:8080/sections';
  sections: Section[];
  activeSection: string;

  @Output()
  sectionChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) {
    this.readSections();
  }

  ngOnInit() {
  }

  addSection(newSection: HTMLInputElement) {
    const title = newSection.value.trim();
    if (!title) return;
    if (this.sections.map(s => s.title).find(t => t === title)) return;
    const section: Section = { title };
    this.sections.unshift(section);
    this.showSection(section);
    this.writeSections().subscribe(res => newSection.value = "");
  }

  readSections() {
    this.getSections()
      .subscribe(sections => {
        this.sections = sections
        if (this.activeSection == null && this.sectionUrl.length > 0) {
          this.showSection(this.sections[0]);
        }
      });
  }

  getSections(): Observable<Section[]> {
    return this.http.get<Section[]>(this.sectionUrl);
  }

  showSection(section: Section) {
    this.activeSection = section.title;
    this.sectionChanged.emit(this.activeSection);
  }

  writeSections() {
    return this.http.post(this.sectionUrl.concat('/replace'), this.sections);
  }

}

export interface Section {
  _id?: string;
  title: string;
}
