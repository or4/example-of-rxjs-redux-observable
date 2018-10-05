import { Form, Session } from ':types';

export enum Actions {
  CHANGE_TEXT_TO_SAVE,
  CHANGE_FORM,
  LOG_IN,
  LOG_OUT,
  CHANGE_SESSION
}

export const ActionCreators = {
  changeForm: <K extends keyof Form>(key: K, value: Form[K]) => ({ type: Actions.CHANGE_FORM, payload: { key, value }}),
  changeTextToSave: (text: string) => ({ type: Actions.CHANGE_TEXT_TO_SAVE, payload: { text } }),
  changeSession: <K extends keyof Session>(key: K, value: Session[K]) => ({ type: Actions.CHANGE_SESSION, payload: { key, value }}),
  logIn: () => ({ type: Actions.LOG_IN }),
  logOut: () => ({ type: Actions.LOG_OUT }),
}