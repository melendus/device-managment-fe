import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../components/common/types/DataTypes";

const initialState = {
  currentUser: {
    id: -1,
    role: "",
    email: "",
    firstName: "",
    lastName: "",
  } as UserType,
  currentUsers: [] as UserType[],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateCurrentUsers: (state, action) => {
      state.currentUsers = action.payload;
    },
    deleteUser: (state) => {
      state.currentUser = initialState.currentUser;
    },
  },
});

export const { updateCurrentUser, updateCurrentUsers, deleteUser } = userSlice.actions;

export default userSlice.reducer;
