import { tasksSlice } from "features/todolists-list/tasks/model/tasks.slice";
import { todolistsSlice } from "features/todolists-list/todolists/model/todolists.slice";
import { AnyAction, combineReducers } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { appSlice } from "app/app.slice";
import { authSlice } from "features/auth/auth.slice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  tasks: tasksSlice,
  todolists: todolistsSlice,
  app: appSlice,
  auth: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;
