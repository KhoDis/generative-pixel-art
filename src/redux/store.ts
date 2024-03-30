import { configureStore } from "@reduxjs/toolkit";
import { figureInstructionSlice } from "./slice.ts";

const store = configureStore({
  reducer: {
    [figureInstructionSlice.name]: figureInstructionSlice.reducer,
  },
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
