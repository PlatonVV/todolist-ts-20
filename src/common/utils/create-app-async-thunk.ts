import { AppDispatch, AppRootStateType } from "app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "common/types";

/**
 *  This function creates an async thunk using the "createAsyncThunk" utility function from the Redux Toolkit.
 *  The created thunk will have specific type definitions for its state, dispatch, and reject value.
 */

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppDispatch;
  rejectValue: null | RejectValueType;
}>();

export type RejectValueType = {
  data: ResponseType;
  showGlobalError: boolean;
};
