import { ActionReducer } from '@ngrx/store';
import { AppState } from 'src/app/redux/states';
import { setLocalStorage } from 'src/app/utilities';

export const hydrationMetaReducer = (reducer: ActionReducer<AppState>): ActionReducer<AppState> => {
  return (state, action) => {
    const nextState = reducer(state, action);
    setLocalStorage('favorites', nextState.favorites);
    return nextState;
  };
};
