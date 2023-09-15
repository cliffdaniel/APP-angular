import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/models';
import { addFavorite, loadFavorites, removeFavorite } from 'src/app/redux/actions';
import { getLocalStorage } from 'src/app/utilities';

const storedFavorites = getLocalStorage('favorites') || [];
export const initialState: Task[] = storedFavorites;

export const favoriteReducer = createReducer(
  initialState,
  on(addFavorite, (state, { id, title, description, status }) => {
    if (state.some(person => person.id === id)) {
      return state;
    } else {
      const newPerson: Task = { id, title, description, status };
      return [...state, newPerson];
    }
  }),
  on(loadFavorites, (state, { favorites }) => {
    return [...favorites];
  }),
  on(removeFavorite, (state, { id }) => {
    return state.filter(person => person.id !== id);
  })
);
