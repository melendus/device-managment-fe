import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: -1,
};

export const clickedDeviceSlice = createSlice({
    name: "clickedDevice",
    initialState,
    reducers: {
        updateClickedDevice(state, action) {
            return action.payload;
        },
        deleteClickedDevice(state) {
            return initialState;
        },
    },
});

export const { updateClickedDevice, deleteClickedDevice } =
    clickedDeviceSlice.actions;

export default clickedDeviceSlice.reducer;
