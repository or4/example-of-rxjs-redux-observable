import { Observable, Observer } from "rxjs";
import * as R from 'ramda';
const convert = require('xml-js');

export function getSuggestions(text: string): Observable<string[]> {
  return Observable.create((observer: Observer<string[]>) => {
    const req = new XMLHttpRequest();
    const onLoad = () => {
      try {
        // transforming response into array of strings
        const result: string[] = <string[]>R.pipe<any, any, any, any, any, any>(
          convert.xml2json,
          JSON.parse,
          (el) => el['elements'][0]['elements'],
          R.map((el: any) => el['elements']['0']['attributes']['data']),
          R.filter(R.is(String))
        )(req.responseText);
        // ============================================
        observer.next(result);
      } catch (e) {
        observer.error('cannot parse result');
      }
    };
    const onLoadEnd = () => {
      observer.complete();
    };
    const onError = (e: any) => {
      observer.error(e);
    };
    req.addEventListener('load', onLoad);
    req.addEventListener('loadend', onLoadEnd);
    req.addEventListener('error', onError);
    req.open('get', `/complete/search?output=toolbar&hl=en&q=${text}`);
    req.send();
    return () => req.abort();
  });
}