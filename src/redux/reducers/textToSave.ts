import { GlobalState } from ':types';
import { ActionCreators } from '../actions';

export const changeTextToSave = (state: GlobalState, action: ReturnType<typeof ActionCreators.changeTextToSave>): GlobalState => {
  return {
    ...state,
    textToSave: action.payload.text
  };
};