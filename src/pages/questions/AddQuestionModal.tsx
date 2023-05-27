import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import {
  AddQuestionType,
  TagType,
} from "../../components/common/types/DataTypes";
// @ts-ignore
import FileBase64 from "react-file-base64";
import { useAppSelector } from "../../hooks/hooks";

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
interface AddQuestionProps {
  handleClose: () => void;
  isOpen: boolean;
}

const mockTags: TagType[] = [
  {
    tagId: Math.random() * 1000,
    name: "C++",
  },
  {
    tagId: Math.random() * 1000,
    name: "React",
  },
  {
    tagId: Math.random() * 1000,
    name: "Spring",
  },
];

const AddQuestionModal = ({ handleClose, isOpen }: AddQuestionProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [tags, setTags] = useState(mockTags);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const currentUser = useAppSelector((state) => state.currentUser);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("currentUser----->", currentUser);
    console.log(title);
    console.log(description);
    console.log(picture);
    console.log(selectedTags);

    const questionToBeAdded: AddQuestionType = {
      title,
      description,
      picture,
    };

    handleClose();
  };

  const renderTag = (tag: any) => {
    //TODO AFTER IMPLEMENTING AUTH AND STORING CURRENT USER
    //const isCurrentUser =

    return `${tag.name}`;
  };

  const handleChangeDropdownTag = (
    event: React.ChangeEvent<{}>,
    newValue: any
  ) => {
    setSelectedTags(newValue);
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
          Add question
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Please fill the information for your question!
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            sx={{ mt: 2 }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            required
            sx={{ mt: 2 }}
          />
          <Autocomplete
            sx={{ flexGrow: "1", mt: 2, mb: 2 }}
            options={tags}
            getOptionLabel={(option) => renderTag(option)}
            multiple
            freeSolo
            value={selectedTags}
            onChange={handleChangeDropdownTag}
            renderInput={(params) => (
              <TextField {...params} label="Tags" variant="outlined" />
            )}
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

export default AddQuestionModal;
