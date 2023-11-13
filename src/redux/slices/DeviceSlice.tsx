import { createSlice } from "@reduxjs/toolkit";
import { Device, UserType } from "../../components/common/types/DataTypes";

const initialState = {
  currentDevice: {
    id: -1,
    description: "",
    address: "",
    energyConsumptionPerHour: -1,
    userId: -1,
  } as Device,
  currentDevices: [] as Device[],
};

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    updateCurrentDevice: (state, action) => {
      state.currentDevice = action.payload;
    },
    updateCurrentDevices: (state, action) => {
      state.currentDevices = action.payload;
    },
    deleteDevice: (state) => {
      state.currentDevice = initialState.currentDevice;
    },
  },
});

export const { updateCurrentDevice, updateCurrentDevices, deleteDevice } =
  deviceSlice.actions;

export default deviceSlice.reducer;
