import React, { useState } from "react";
import { Box, Modal, Typography, TextField, Button } from "@mui/material";
import { AddAnswerType } from "../../components/common/types/DataTypes";
// @ts-ignore
import FileBase64 from "react-file-base64";
import { addQuestionAnswer, editAnswer } from "../../services/AnswersApi";

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
interface EditAnswerProps {
  handleClose: () => void;
  isOpen: boolean;
  answers: any;
  setAnswers: React.Dispatch<React.SetStateAction<any>>;
  answer: any;
}

const EditAnswerModal = ({
  handleClose,
  isOpen,
  answers,
  setAnswers,
  answer,
}: EditAnswerProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const answerToBeAdded: AddAnswerType = {
      title,
      description,
      picture,
    };

    const newAnswer = {
      ...answer,
      title: answerToBeAdded.title,
      description: answerToBeAdded.description,
      picture: answerToBeAdded.picture,
    };

    const returnedAnswer = await editAnswer(newAnswer);

    const index = answers.findIndex(
      (answer: any) => answer.answerId === returnedAnswer.data.answerId
    );

    const newAnswersFinal = [...answers];
    newAnswersFinal[index] = returnedAnswer.data;
    setAnswers(newAnswersFinal);
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

export default EditAnswerModal;
