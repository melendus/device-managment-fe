import React, { useEffect, useState } from "react";
import SmallDevice from "../../components/common/question/SmallDevice";
import { BarLoader } from "react-spinners";
import colorConfigs from "../../configs/colorConfigs";
import {
  Device,
  QuestionType,
  TagType,
  UserType,
} from "../../components/common/types/DataTypes";
import { Button, Grid, Paper } from "@mui/material";
import AddQuestionModal from "./AddQuestionModal";
import { getAllUsers } from "../../services/UserApi";
import { getAllDevices, getAllUserDevices } from "../../services/DevicesApi";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateCurrentUsers } from "../../redux/slices/UserSlice";
import { updateCurrentDevices } from "../../redux/slices/DeviceSlice";

const creator: UserType = {
  id: Math.random() * 1000,
  firstName: "Stefan",
  lastName: "CEl mare",
  role: "user",
  email: "email@email.com",
};

const creator2: UserType = {
  id: Math.random() * 1000,
  firstName: "Ali",
  lastName: "Baba",
  role: "user",
  email: "email@email.com",
};

const creators = [creator, creator2];

const mockTags: TagType[] = [
  {
    id: Math.random() * 1000,
    name: "C++",
  },
  {
    id: Math.random() * 1000,
    name: "React",
  },
  {
    id: Math.random() * 1000,
    name: "Spring",
  },
];

const DevicesPage = () => {
  const [devices, setDevices] = useState([] as Device[]);
  const [filteredDevices, setFilteredDevices] = useState([] as Device[]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
  const [deviceToUpdate, setDeviceToUpdate] = useState<Device>();
  const devicesState = useAppSelector((state) => state.devices);
  const [isUpdate, setIsUpdate] = useState(false);

  const currentUserState = useAppSelector((state) => state.currentUser);
  const currentUser = currentUserState.currentUser;

  const dispatch = useAppDispatch();
  const handleOpen = () => setIsAddDeviceModalOpen(true);
  const handleClose = () => setIsAddDeviceModalOpen(false);

  useEffect(() => {
    (async function () {
      let res;
      if (currentUser.role === "user") {
        const { data: dataRes } = await getAllUserDevices(
          currentUser.id.toString()
        );
        res = dataRes;
      } else {
        res = await getAllDevices();
      }
      setDevices(res);
      setFilteredDevices(res);
      const resUsers = await getAllUsers();
      dispatch(updateCurrentUsers(resUsers));
      dispatch(updateCurrentDevices(res));
    })();
  }, []);

  useEffect(() => {
    setFilteredDevices(devices);
  }, [devices]);

  useEffect(() => {
    setDevices(devicesState.currentDevices);
  }, [devicesState.currentDevices]);

  return (
    <>
      <AddQuestionModal
        handleClose={handleClose}
        isOpen={isAddDeviceModalOpen}
        isUpdate={isUpdate}
        deviceToUpdate={deviceToUpdate}
      />
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Grid container spacing={2}>
          {currentUser.role === "admin" && (
            <Grid item xs={12}>
              <Grid
                item
                xs={12}
                md="auto"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button variant="contained" onClick={handleOpen}>
                  Add Device
                </Button>
              </Grid>
            </Grid>
          )}
          {filteredDevices.length === 0 ? (
            <Grid item xs={12}>
              YOU HAVE NO DEVICES CURRENTLY!
            </Grid>
          ) : (
            <Grid item xs={12}>
              {filteredDevices.map((device: Device, index) => (
                <SmallDevice
                  device={device}
                  key={index}
                  setDeviceToUpdate={setDeviceToUpdate}
                  setIsUpdate={setIsUpdate}
                  setIsOpen={setIsAddDeviceModalOpen}
                  showOptions={currentUser.role === "admin"}
                />
              ))}
            </Grid>
          )}
        </Grid>
      </Paper>
    </>
  );
};

export default DevicesPage;
