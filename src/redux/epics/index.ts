import { combineEpics } from 'redux-observable';
import { saveText } from './textToSave';
import { logIn, logOut } from './session';

export default combineEpics(
  saveText,
  logIn,
  logOut
);