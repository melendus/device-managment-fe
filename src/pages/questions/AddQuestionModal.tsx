import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Device, UserType } from "../../components/common/types/DataTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styled from "styled-components";
import {
  createDevice,
  deleteDevice,
  updateDevice,
} from "../../services/DevicesApi";
import { updateCurrentDevices } from "../../redux/slices/DeviceSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
interface AddQuestionProps {
  handleClose: () => void;
  isOpen: boolean;
  deviceToUpdate?: Device;
  isUpdate?: boolean;
}

const initialFormData = {
  name: "",
  description: "",
  address: "",
  energyConsumptionPerHour: Number.NaN,
  userId: -1,
};

const AddQuestionModal = ({
  handleClose,
  isOpen,
  deviceToUpdate,
  isUpdate,
}: AddQuestionProps) => {
  const [formData, setFormData] = useState(initialFormData);
  const [selectedUser, setSelectedUser] = useState<UserType | null>();
  const currentUserState = useAppSelector((state) => state.currentUser);
  const [users, setUsers] = useState<UserType[]>([]);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof typeof initialFormData, string>>
  >({});

  const devicesState = useAppSelector((state) => state.devices);

  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const errors: Partial<Record<keyof typeof initialFormData, string>> = {};
    for (const key in formData) {
      if (
        (formData[key as keyof typeof initialFormData] === "" ||
          formData[key as keyof typeof initialFormData] === null) &&
        key !== "userId"
      ) {
        errors[key as keyof typeof initialFormData] = "This field is required";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const deviceData =
      formData.userId === -1
        ? {
            ...formData,
            userId: undefined,
          }
        : {
            ...formData,
            userId: selectedUser !== undefined ? selectedUser?.id : undefined,
          };

    const { data: addedDevice } = await createDevice(deviceData);

    dispatch(
      updateCurrentDevices([...devicesState.currentDevices, addedDevice])
    );

    handleClose();
  };

  const handleUpdateDevice = async () => {
    const deviceData =
      formData.userId === -1
        ? {
            ...formData,
            userId: undefined,
          }
        : {
            ...formData,
            userId: selectedUser !== undefined ? selectedUser?.id : undefined,
          };

    if (deviceToUpdate) {
      const { data: updatedDeviceData } = await updateDevice(
        deviceToUpdate?.id.toString(),
        deviceData
      );

      const deviceIndex = devicesState.currentDevices.findIndex(
        (device) => device.id === deviceToUpdate.id
      );

      if (deviceIndex !== -1) {
        const updatedDevices = [...devicesState.currentDevices];
        updatedDevices[deviceIndex] = updatedDeviceData;
        dispatch(updateCurrentDevices(updatedDevices));
      }
    }
    handleClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const renderUserName = (user: UserType) => {
    return `${user.firstName} ${user.lastName}`;
  };

  const handleSelectedUserChange = (value: UserType | null) => {
    if (value?.id) {
      setFormData({
        ...formData,
        userId: value?.id,
      });
      setSelectedUser(value);
    }
  };

  const handleDeleteDevice = async () => {
    if (isUpdate && deviceToUpdate) {
      await deleteDevice(deviceToUpdate.id.toString());

      const updatedDevices = devicesState.currentDevices.filter(
        (device) => device.id !== deviceToUpdate.id
      );

      dispatch(updateCurrentDevices(updatedDevices));
      handleClose();
    }
  };

  useEffect(() => {
    setUsers(currentUserState.currentUsers);
  }, []);

  useEffect(() => {
    setFormErrors({});
    if (!isUpdate) {
      setFormData(initialFormData);
    } else {
      if (deviceToUpdate) {
        setFormData(deviceToUpdate);
      }
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isUpdate ? "Device Description!" : "Add Device!"}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Please fill the information for the device!
        </Typography>
        <TextField
          variant="outlined"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mt: 2 }}
          error={!!formErrors.name}
          helperText={formErrors.name}
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          multiline
          required
          sx={{ mt: 2 }}
          error={!!formErrors.description}
          helperText={formErrors.description}
        />
        <TextField
          label="Address"
          variant="outlined"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mt: 2 }}
          error={!!formErrors.address}
          helperText={formErrors.address}
        />
        <TextField
          label="Energy Consumption"
          variant="outlined"
          name="energyConsumptionPerHour"
          value={formData.energyConsumptionPerHour}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mt: 2 }}
          type="number"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          error={!!formErrors.energyConsumptionPerHour}
          helperText={formErrors.energyConsumptionPerHour}
        />
        <Autocomplete
          sx={{ flexGrow: "1", mt: 2, mb: 2 }}
          options={users}
          getOptionLabel={(user) => renderUserName(user)}
          value={selectedUser}
          onChange={(event, newValue) => {
            handleSelectedUserChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="User"
              variant="outlined"
              name="user"
            />
          )}
        />
        <ButtonsContainer>
          <Button
            type="submit"
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={handleDeleteDevice}
          >
            Delete
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            onClick={isUpdate ? handleUpdateDevice : handleSubmit}
          >
            Submit
          </Button>
        </ButtonsContainer>
      </Box>
    </Modal>
  );
};

export default AddQuestionModal;
