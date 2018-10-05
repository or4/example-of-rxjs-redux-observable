import { Actions, ActionCreators } from ':actions';
import { Observable, of, from, empty } from 'rxjs';
import { filter, switchMap, withLatestFrom, pluck, catchError, takeUntil, tap } from 'rxjs/operators';
import { GlobalState } from ':types';
import { StateObservable } from 'redux-observable';
import { Action } from 'redux';
import { requestLogIn, requestLogOut } from ':api';


export const logIn = (action$: Observable<Action>, store$: StateObservable<GlobalState>): Observable<Action> => {
  return action$.pipe(
    filter(action => action.type === Actions.LOG_IN),
    withLatestFrom(store$),
    pluck('1', 'form'),
    switchMap(({ username, password }) => requestLogIn(username, password).pipe(
      switchMap(({ token, name, photo }) => of(
        ActionCreators.changeSession('name', name),
        ActionCreators.changeSession('token', token),
        ActionCreators.changeSession('photo', photo)
      )),
      takeUntil(action$.pipe(
        filter(action => action.type === Actions.LOG_OUT),
      )),
      catchError(() => empty())
    )),
  )
}

export const logOut = (action$: Observable<Action>, store$: StateObservable<GlobalState>): Observable<Action> => {
  return action$.pipe(
    filter(action => action.type === Actions.LOG_OUT),
    withLatestFrom(store$),
    pluck('1', 'session'),
    tap(({ token }) => {
      requestLogOut(token).subscribe()
    }),
    switchMap(() => of(
      ActionCreators.changeSession('name', ''),
      ActionCreators.changeSession('token', ''),
      ActionCreators.changeSession('photo', '')
    ))
  )
}

