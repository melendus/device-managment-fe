import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: -1,
};

export const clickedUserSlice = createSlice({
  name: "clickedUser",
  initialState,
  reducers: {
    updateClickedUser(state, action) {
      return action.payload;
    },
    deleteClickedUser(state) {
      return initialState;
    },
  },
});

export const { updateClickedUser, deleteClickedUser } =
  clickedUserSlice.actions;

export default clickedUserSlice.reducer;
