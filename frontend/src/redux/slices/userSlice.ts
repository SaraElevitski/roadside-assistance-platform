import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Volunteer } from "../../models/volunteers.model";

const userSlice = createSlice({
  initialState: {
    user: null as Volunteer | null,
    message: "",
  },
  name: "user",
  reducers: {
    userDetails: (state, action: PayloadAction<Volunteer>) => {
      state.user = action.payload;
    },
    logOutUser: (state) => {
      state.user = null;
    }
  },
});

export default userSlice;
export const { userDetails, logOutUser } = userSlice.actions;
