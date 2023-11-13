import React, { useEffect, useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { createUser, updateUser } from "../../services/UserApi";
import { updateCurrentUsers } from "../../redux/slices/UserSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

interface AddUserModalInterface {
  closeModal: () => void;
  open: boolean;
  isUpdate: boolean;
  userToUpdate: any;
}

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

const InputFieldsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-direction: column;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
`;

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const AddUserModal = (props: AddUserModalInterface) => {
  const { open, closeModal, isUpdate, userToUpdate } = props;
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const dispatch = useAppDispatch();

  const currentUserState = useAppSelector((state) => state.currentUser);
  const currentClickedUser = useAppSelector((state) => state.clickedUser);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = async () => {
    const { data: createdUser } = await createUser(formData);
    dispatch(
      updateCurrentUsers([...currentUserState.currentUsers, createdUser])
    );
    closeModal();
  };

  const handleUpdateUser = async () => {
    const { data: updatedUserWithPassword } = await updateUser(
      currentClickedUser.userId.toString(),
      formData
    );

    const { password, ...updatedUserWithoutPassword } = updatedUserWithPassword;

    const userIndex = currentUserState.currentUsers.findIndex(
      (user) => user.id === currentClickedUser.userId
    );

    if (userIndex !== -1) {
      const updatedUsers = [...currentUserState.currentUsers];
      updatedUsers[userIndex] = updatedUserWithoutPassword;

      dispatch(updateCurrentUsers(updatedUsers));
    }

    closeModal();
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!isUpdate) {
      setFormData(initialFormData);
    } else {
      const { password, ...formDataWithoutPassword } = userToUpdate;
      setFormData(formDataWithoutPassword);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Add User!
        </Typography>
        <InputFieldsContainer>
          <TextField
            variant="outlined"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </InputFieldsContainer>
        <ButtonsContainer>
          <Button variant="outlined" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={isUpdate ? handleUpdateUser : handleAddUser}
          >
            {isUpdate ? "Update" : "Add User"}
          </Button>
        </ButtonsContainer>
      </Box>
    </Modal>
  );
};
export default AddUserModal;
