import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import { AddAnswerType } from "../../components/common/types/DataTypes";
// @ts-ignore
import FileBase64 from "react-file-base64";
import { useAppSelector } from "../../hooks/hooks";
import { addQuestionAnswer } from "../../services/AnswersApi";

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
interface EditQuestionProps {
  handleClose: () => void;
  isOpen: boolean;
  answers: any;
  setAnswers: React.Dispatch<React.SetStateAction<any>>;
}

const AddAnswerModal = ({
  handleClose,
  isOpen,
  answers,
  setAnswers,
}: EditQuestionProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const currentUser = useAppSelector((state) => state.currentUser);
  const currentQuestion = useAppSelector((state) => state.currentQuestion);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const answerToBeAdded: AddAnswerType = {
      title,
      description,
      picture,
    };

    const newAnswer = {
      title: answerToBeAdded.title,
      description: answerToBeAdded.description,
      picture: answerToBeAdded.picture,
    };

    console.log(
      "ceva---->",
      currentQuestion.id.toString(),
      currentUser.userId.toString(),
      newAnswer
    );

    const returnedAnswer = await addQuestionAnswer(
      currentQuestion.id.toString(),
      currentUser.userId.toString(),
      newAnswer
    );

    setAnswers([returnedAnswer.data, ...answers]);
    handleClose();
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
          Edit Question
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

export default AddAnswerModal;
