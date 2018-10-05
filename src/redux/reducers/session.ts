import { GlobalState } from ':types';
import { ActionCreators } from '../actions';

export const changeSession = (state: GlobalState, action: ReturnType<typeof ActionCreators.changeSession>): GlobalState => {
  return {
    ...state,
    session: {
      ...state.session,
      [action.payload.key]: action.payload.value
    }
  };
};