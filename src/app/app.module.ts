import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotesComponent } from './components/notes/notes.component';
import { SectionsComponent } from './components/sections/sections.component';
import { SectionFilterPipe } from './components/sections/section-filter.pipe';
import { NotesEditorComponent } from './components/notes-editor/notes-editor.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewSectionComponent } from './components/view-section/view-section.component';
import { UserFormComponent } from './components/user-form/user-form.component';

import { NotesServerService } from './services/notes-server.service';
import { CanDeactivateNoteService } from './services/can-deactivate-note.service';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    SectionsComponent,
    SectionFilterPipe,
    NotesEditorComponent,
    PageNotFoundComponent,
    ViewSectionComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, AppRoutingModule
  ],
  providers: [NotesServerService, CanDeactivateNoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
