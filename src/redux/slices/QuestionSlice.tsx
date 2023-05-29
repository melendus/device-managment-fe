import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: -1,
};

export const questionSlice = createSlice({
  name: "currentQuestion",
  initialState,
  reducers: {
    updateQuestion(state, action) {
      console.log("actionPayload---->", action.payload);
      return action.payload;
    },
    deleteQuestion(state) {
      return initialState;
    },
  },
});

export const { updateQuestion, deleteQuestion } = questionSlice.actions;

export default questionSlice.reducer;
