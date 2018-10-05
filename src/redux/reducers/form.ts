import { GlobalState } from ':types';
import { ActionCreators } from '../actions';

export const changeForm = (state: GlobalState, action: ReturnType<typeof ActionCreators.changeForm>): GlobalState => {
  return {
    ...state,
    form: {
      ...state.form,
      [action.payload.key]: action.payload.value
    }
  };
};