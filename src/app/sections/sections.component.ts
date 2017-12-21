import { Component, OnInit } from '@angular/core';
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

  constructor(private http: HttpClient) {
    this.readSections();
  }

  ngOnInit() {
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
  }

}

interface Section {
  _id: string;
  title: string;
}
