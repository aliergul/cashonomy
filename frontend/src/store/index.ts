import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import authSlice, { logout } from "./authSlice";
import snackbarSlice from "./snackbarSlice";
import { authApi } from "./authApi";
import { recordsApi } from "./recordsQuery";

const reducers = combineReducers({
  auth: authSlice,
  snackbars: snackbarSlice,
  [authApi.reducerPath]: authApi.reducer,
  [recordsApi.reducerPath]: recordsApi.reducer,
});

// reset state on logout
const rootReducer = (state: any, action: any) => {
  if (action.type === logout.toString()) {
    state = {
      auth: state.auth,
    };
  }
  return reducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, recordsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
