import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NotesEditorComponent } from './notes-editor/notes-editor.component';

@Injectable()
export class CanDeactivateNoteService implements CanDeactivate<NotesEditorComponent> {
  canDeactivate(component: NotesEditorComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const note = component.notesComponent.text;
    if (note && note.length > 0) {
      return window.confirm('You have entered the note. Do you really want to change section?');
    } else return true;
  }

}
