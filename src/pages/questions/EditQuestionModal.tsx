import React, { useEffect, useState } from "react";
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
  QuestionType,
  TagType,
} from "../../components/common/types/DataTypes";
// @ts-ignore
import FileBase64 from "react-file-base64";
import { useAppSelector } from "../../hooks/hooks";
import { saveQuestion, updateQuestionById } from "../../services/QuestionApi";
import {
  addTags,
  deleteAllQuestionTags,
  getAllTags,
  getTagsByQuestionId,
} from "../../services/TagApi";

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
  question: any;
  setQuestion: React.Dispatch<React.SetStateAction<any>>;
}

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

const EditQuestionModal = ({
  handleClose,
  isOpen,
  question,
  setQuestion,
}: EditQuestionProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [tags, setTags] = useState(mockTags);
  const [selectedTags, setSelectedTags] = useState<[]>([]);
  const currentUser = useAppSelector((state) => state.currentUser);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const questionToBeAdded: AddQuestionType = {
      title,
      description,
      picture,
    };

    const newQuestion = { ...question };
    newQuestion.title = questionToBeAdded.title;
    newQuestion.description = questionToBeAdded.description;
    newQuestion.picture = questionToBeAdded.picture;
    await updateQuestionById({
      id: currentUser.currentUser.id,
      ...newQuestion,
    });

    const questionTags = await getTagsByQuestionId(question.id);

    const tagIds = questionTags.data.map((tag: any) => tag.id);

    await deleteAllQuestionTags({
      tagsIds: tagIds,
      questionId: question.id,
    });

    newQuestion.tags = await addTags({
      tags: selectedTags,
      questionId: newQuestion.id,
    });
    console.log("newQuestion---->", newQuestion);
    setQuestion(newQuestion);
    handleClose();
  };

  const renderTag = (tag: any) => {
    if (tag !== null) {
      return tag;
    } else {
      return "";
    }
  };

  const handleChangeDropdownTag = (
    event: React.ChangeEvent<{}>,
    newValue: any
  ) => {
    setSelectedTags(newValue);
  };

  useEffect(() => {
    const fetchTags = async () => {
      const res = await getAllTags();
      const tags = res.data.map((tag: any) => tag.name);

      setTags(tags);
    };
    fetchTags();
  }, []);

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

export default EditQuestionModal;
