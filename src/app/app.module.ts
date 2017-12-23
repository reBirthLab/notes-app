import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { SectionsComponent } from './sections/sections.component';
import { SectionFilterPipe } from './sections/section-filter.pipe';
import { AppRoutingModule } from './/app-routing.module';
import { NotesEditorComponent } from './notes-editor/notes-editor.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewSectionComponent } from './view-section/view-section.component';
import { NotesServerService } from './notes-server.service';


@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    SectionsComponent,
    SectionFilterPipe,
    NotesEditorComponent,
    PageNotFoundComponent,
    ViewSectionComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, AppRoutingModule
  ],
  providers: [NotesServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
