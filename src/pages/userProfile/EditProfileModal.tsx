import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import { TagType } from "../../components/common/types/DataTypes";
// @ts-ignore
import FileBase64 from "react-file-base64";

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
interface EditProfileProps {
  handleClose: () => void;
  isOpen: boolean;
}

const EditProfileModal = ({ handleClose, isOpen }: EditProfileProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Handle form submission logic
    // Reset form fields
    setFirstName("");
    setLastName("");
    setEmail("");
    handleClose();
  };

  const renderTag = (tag: TagType) => {
    //TODO AFTER IMPLEMENTING AUTH AND STORING CURRENT USER
    //const isCurrentUser =

    return `${tag.name}`;
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Profile
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Please fill the new information about your profile!
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            required
            sx={{ mt: 2 }}
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            required
            sx={{ mt: 2 }}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            multiline
            required
            sx={{ mt: 2, mb: 2 }}
          />
          <div style={{ paddingBottom: "5px" }}>
            <FileBase64
              multiple={false}
              onDone={({ base64 }: any) => setPicture(base64)}
            />
          </div>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;
