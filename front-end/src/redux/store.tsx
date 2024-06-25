import { configureStore } from "@reduxjs/toolkit";
import { AuthStateProps, authSlice } from "./slices/authSlice";

export interface RootState {
   auth: AuthStateProps;
}

export const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
   },
});

export type AppDispatch = typeof store.dispatch;
