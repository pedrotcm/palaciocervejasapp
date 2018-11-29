import { AuthState, auth } from './auth';
import { AppState, app } from './app';
import { HomeState, home } from './home';
import { CategoryState, category } from './category';
import { ProductState, product } from './product';
import { ClientState, client } from './client';

/**
 * Root states.
 */
export type States = {
  app: AppState,
  auth: AuthState,
  home: HomeState,
  category: CategoryState,
  product: ProductState,
  client: ClientState
}

/**
 * Root reducers.
 */
export const reducers = {
  app: app.reducer,
  auth: auth.reducer,
  home: home.reducer,
  category: category.reducer,
  product: product.reducer,
  client: client.reducer
}

/**
 * Root actions.
 */
export const actions = {
  app: app.actions,
  auth: auth.actions,
  home: home.actions,
  category: category.actions,
  product: product.actions,
  client: client.actions
}

export { app, auth, home, category, product }