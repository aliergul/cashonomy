import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Snackbar } from "../../types/Snackbar";

interface SnackbarState {
  items: Snackbar[];
}

const initialState = { items: [] } as SnackbarState;

const snackbarSlice = createSlice({
  name: "snackbars",
  initialState,
  reducers: {
    addSnackbar: {
      reducer: (state, action: PayloadAction<Snackbar>) => {
        const { id, text, duration = 6000 } = action.payload;
        state.items.push({
          id,
          text,
          duration,
        });
      },
      prepare: ({ text, duration }: Omit<Snackbar, "id">) => {
        const id = nanoid();

        return { payload: { id, text, duration } };
      },
    },
    removeSnackbar(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addSnackbar, removeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
