import { createReducer } from 'reduxsauce';
import { GlobalState } from ':types';
import { Actions } from '../actions';
import { changeForm } from './form';
import { changeTextToSave } from './textToSave';
import { changeSession } from './session';


export const INITIAL_STATE: GlobalState = {
  form: {
    username: '',
    password: ''
  },
  session: {
    token: '',
    name: '',
    photo: ''
  },
  textToSave: window.localStorage.getItem('textToSave') || ''
}


const HANDLERS = {
  [Actions.CHANGE_FORM]: changeForm,
  [Actions.CHANGE_TEXT_TO_SAVE]: changeTextToSave,
  [Actions.CHANGE_SESSION]: changeSession
};

export default createReducer(INITIAL_STATE, HANDLERS);