import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../components/common/types/DataTypes";

const initialState: UserType = {
  userId: -1,
  role: "",
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  score: -1,
  banned: false,
  votes: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      return action.payload;
    },
    deleteUser(state) {
      return initialState;
    },
  },
});

export const { updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
