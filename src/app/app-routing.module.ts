import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesEditorComponent } from './notes-editor/notes-editor.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewSectionComponent } from './view-section/view-section.component';

const routes: Routes = [
  { path: '', component: NotesEditorComponent },
  { path: 'viewSection/:name', component: ViewSectionComponent },
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
