import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/models';

export const loadFavorites = createAction('[Favorites] loadFavorites', props<{ favorites: Task[] }>());
export const addFavorite = createAction('[Favorites] addFavorite',  props<{ id: string; title: string, description: string, status: string }>());
export const removeFavorite = createAction('[Favorites] removeFavorite', props<{ id: string }>());

