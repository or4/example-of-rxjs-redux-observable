import { Actions } from ':actions';
import { Observable, of, never } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { GlobalState } from ':types';
import { StateObservable } from 'redux-observable';
import { Action } from 'redux';


export const saveText = (action$: Observable<Action>, store$: StateObservable<GlobalState>): Observable<Action> => {
  store$.pipe(
    pluck('textToSave'),
    debounceTime(2000),
    distinctUntilChanged()
  ).subscribe((data: string) => {
    console.log('saved', data);
    window.localStorage.setItem('textToSave', data);
  });
  return of();
}