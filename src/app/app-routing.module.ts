import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesEditorComponent } from './components/notes-editor/notes-editor.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewSectionComponent } from './components/view-section/view-section.component';
import { UserFormComponent } from './components/user-form/user-form.component';

import { CanDeactivateNoteService } from './services/can-deactivate-note.service';

const routes: Routes = [
  { path: '', component: NotesEditorComponent, canDeactivate: [CanDeactivateNoteService] },
  { path: 'register', component: UserFormComponent },
  { path: 'viewSection/:name', component: ViewSectionComponent },
  { path: ':name', component: NotesEditorComponent, canDeactivate: [CanDeactivateNoteService] },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
