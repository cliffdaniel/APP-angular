import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { favoriteReducer } from "./reducers";
import { hydrationMetaReducer } from "./hydration";
import { AppState } from 'src/app/redux/states';

export const reducers: ActionReducerMap<AppState> = {
  favorites: favoriteReducer
}

export const metaReducers: MetaReducer[] = [
  hydrationMetaReducer
]
