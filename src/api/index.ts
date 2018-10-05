import { Session } from ':types';
import { Observable, Observer } from 'rxjs';
export * from './searchSuggestions';

export function requestLogIn(username: string, password: string): Observable<Session> {
  return Observable.create((observer: Observer<Session>) => {
    setTimeout(() => {
      observer.next({
        token: 'blablabla',
        name: 'John Doe',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZCGyzQCpBWIboSErgUWkpGjp6NnHDRHNukRLST7JZ484gOrrN'
      });
      observer.complete();
    }, 2000);
  });
}

export function requestLogOut(token: string): Observable<{}> {
  return Observable.create((observer: Observer<{}>) => {
    setTimeout(() => {
      observer.next({});
      observer.complete();
    }, 2000);
  });
}
