import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Volunteer } from "../../models/volunteers.model";

const MessageSlice = createSlice({
  initialState: {
    text: "",
    type: "",
  },
  name: "message",
  reducers: {
    setMessage: (
      state,
      action: PayloadAction<{ text: string; type: string }>,
    ) => {
      state.text = action.payload.text;
      state.type = action.payload.type;
    },
    clearMessage: (state) => {
      state.text = "";
    },
  },
});

export const { setMessage, clearMessage } = MessageSlice.actions;
export default MessageSlice;
