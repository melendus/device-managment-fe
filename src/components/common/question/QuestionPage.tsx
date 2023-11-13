import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import Vote from "./Vote";
import {
  deleteQuestionById,
  getQuestionById,
} from "../../../services/QuestionApi";
import { useAppSelector } from "../../../hooks/hooks";
import {
  deleteAnswerById,
  getAllAnswersByQuestionId,
} from "../../../services/AnswersApi";
import styled from "styled-components";
import { useNavigate } from "react-router";
import EditQuestionModal from "../../../pages/questions/EditQuestionModal";
import { getTagsByQuestionId } from "../../../services/TagApi";
import AddAnswerModal from "../../../pages/questions/AddAnswerModal";
import EditAnswerModal from "../../../pages/questions/EditAnswer";
import VoteWithoutOptions from "./VoteWithoutOptions";
import VoteAnswer from "./VoteAnswer";
import VoteWithoutOptionsAnswer from "./VoteWithoutOptionsAnswer";
import { getAllVotesAnswer } from "../../../services/VoteAnswerApi";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const initialQuestionState = {
  createdAt: new Date().toISOString(),
  title: "",
  description: "",
  tags: [],
  picture: "",
  user: {
    firstName: "",
    lastName: "",
    userId: "",
  },
  id: -1,
};

const initialAnswers = [
  {
    answerId: "-1",
    title: "",
    description: "",
    picture: "",
    user: {
      firstName: "",
      lastName: "",
      userId: "",
    },
  },
];

const QuestionPage = () => {
  const [question, setQuestion] = useState(initialQuestionState);
  const [answers, setAnswers] = useState(initialAnswers);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddAnswerModal, setIsAddAnswerModal] = useState(false);
  const [tags, setTags] = useState<{ name: string }[]>([]);
  const [answerToUpdate, setAnswerToUpdate] = useState(initialAnswers[0]);
  const [answersWithVotes, setAnswersWithVotes] = useState<any[]>([]);

  const [isEditAnswerModalOpen, setIsEditAnswerModalOpen] = useState(false);

  const handleOpen = () => setIsEditModalOpen(true);
  const handleClose = () => setIsEditModalOpen(false);

  const handleOpenEditAnswer = (answer: any) => {
    setIsEditAnswerModalOpen(true);
    setAnswerToUpdate(answer);
  };
  const handleCloseEditAnswer = () => setIsEditAnswerModalOpen(false);

  const handleOpenAnswer = () => setIsAddAnswerModal(true);
  const handleCloseAnswer = () => setIsAddAnswerModal(false);

  const navigate = useNavigate();

  const currentQuestion = useAppSelector((state) => state.currentQuestion);
  const currentUserState = useAppSelector((state) => state.currentUser);
  const currentUser = currentUserState.currentUser;


  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await getQuestionById(currentQuestion.id.toString());
      const questionAnswers = await getAllAnswersByQuestionId(
        currentQuestion.id.toString()
      );
      const questionTags = await getTagsByQuestionId(
        currentQuestion.id.toString()
      );
      setTags(questionTags.data);
      setQuestion(res.data);
      setAnswers(questionAnswers.data);
    };
    fetchQuestion();
  }, []);

  useEffect(() => {
    setTags(question.tags);
  }, [question]);

  const totalAnswers = answers.length;
  const handleImageClick = () => {
    let win = window.open();
    win?.document.write(`<img src=${question.picture} alt="caca">`);
  };

  const handleImageClickAny = (picture: string) => {
    let win = window.open();
    win?.document.write(`<img src=${picture} alt="caca">`);
  };

  const handleClickOnRemove = async () => {
    await deleteQuestionById(currentQuestion.id.toString());
    navigate("/questions");
  };

  const handleClickOnRemoveAnswer = async (answerId: string) => {
    const answerToDeleteIndex = answers.findIndex(
      (answer: any) => answer.answerId.toString() === answerId
    );
    const newAnswers = [
      ...answers.slice(0, answerToDeleteIndex),
      ...answers.slice(answerToDeleteIndex + 1),
    ];
    setAnswers(newAnswers);
    await deleteAnswerById(answerId);
  };

  console.log("answers---->", answers);

  useEffect(() => {
    const getAnswersWithVotes = async () => {
      const answersWithVotes = await Promise.all(
        answers.map(async (answer: any) => {
          let numberOfVotes;
          const res = await getAllVotesAnswer(answer.answerId);
          if (res.data === "") {
            numberOfVotes = 0;
          } else {
            numberOfVotes = res.data;
          }
          return {
            ...answer,
            numberOfVotes: numberOfVotes,
          };
        })
      );

      const sortedAnswersWithVotes = answersWithVotes.sort(
        (a, b) => b.numberOfVotes - a.numberOfVotes
      );

      console.log("sortedAnswersWithVotes ---->", sortedAnswersWithVotes);
      return sortedAnswersWithVotes;
    };

    getAnswersWithVotes().then((value) => setAnswersWithVotes(value));
  }, [answers]);

  return (
    <>
      <EditQuestionModal
        handleClose={handleClose}
        isOpen={isEditModalOpen}
        question={question}
        setQuestion={setQuestion}
      />
      <AddAnswerModal
        handleClose={handleCloseAnswer}
        isOpen={isAddAnswerModal}
        answers={answers}
        setAnswers={setAnswers}
      />
      <EditAnswerModal
        handleClose={handleCloseEditAnswer}
        isOpen={isEditAnswerModalOpen}
        answers={answers}
        setAnswers={setAnswers}
        answer={answerToUpdate}
      />
      <Card>
        <ButtonContainer>
          {(currentUser.id.toString() === question.user.userId.toString() ||
            currentUser.role === "admin") && (
            <>
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                  margin: 2,
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={handleClickOnRemove}
                sx={{
                  margin: 2,
                }}
              >
                Remove
              </Button>
            </>
          )}
          <Button
            variant="contained"
            onClick={handleOpenAnswer}
            sx={{
              margin: 2,
            }}
          >
            Add Answer
          </Button>
        </ButtonContainer>

        <CardHeader
          avatar={
            <>
              {currentUser.id.toString() !==
              question.user.userId.toString() ? (
                <Vote question={question} />
              ) : (
                <VoteWithoutOptions question={question} />
              )}
              <Avatar sx={{ width: 60, height: 60 }}>
                {question.user.firstName.charAt(0)}
              </Avatar>
            </>
          }
          title={
            <Typography variant="h4" component="div" fontWeight="bold">
              {question.title}
            </Typography>
          }
          subheader={`Asked by ${question.user.firstName} ${
            question.user.lastName
          } on ${new Date(question.createdAt).toLocaleDateString(
            "en-GB"
          )} at ${new Date(question.createdAt).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}`}
        />
        <CardContent>
          <Box mb={2}>
            <Typography variant="body2" color="text.secondary">
              Tags:{" "}
              {tags?.map((tag: any) => (
                <Chip
                  key={tag.name}
                  label={tag.name}
                  style={{ marginRight: "5px" }}
                />
              ))}
            </Typography>
          </Box>
          <Typography variant="body1" gutterBottom>
            {question.description}
          </Typography>
          <CardMedia
            component="img"
            alt="Question Image"
            image={question.picture}
            style={{ maxWidth: "50%", maxHeight: "50%", cursor: "pointer" }}
            onClick={handleImageClick}
          />
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Answers ({totalAnswers}):
            </Typography>
            {answersWithVotes.map((answer, index) => (
              <Box
                key={index}
                sx={{
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  borderRadius: "4px",
                  p: 2,
                  mt: 2,
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <>
                  {currentUser.id.toString() !==
                  question.user.userId.toString() ? (
                    <VoteAnswer answer={answer} />
                  ) : (
                    <VoteWithoutOptionsAnswer answer={answer} />
                  )}
                </>

                <Box sx={{ ml: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar>{answer.user.firstName.charAt(0)}</Avatar>
                    <AnswerContainer>
                      <Typography variant="subtitle1" sx={{ ml: 1 }}>
                        {answer.user.firstName} {answer.user.lastName}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ ml: 1 }}>
                        {`Asked by ${question.user.firstName} ${
                          question.user.lastName
                        } on ${new Date(question.createdAt).toLocaleDateString(
                          "en-GB"
                        )}
                        at ${new Date(question.createdAt).toLocaleTimeString(
                          "en-GB",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                        `}
                      </Typography>
                    </AnswerContainer>
                  </Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {answer.description}
                  </Typography>
                  <CardMedia
                    component="img"
                    alt="Question Image"
                    image={answer.picture}
                    style={{
                      maxWidth: "50%",
                      maxHeight: "50%",
                      cursor: "pointer",
                    }}
                    onClick={() => handleImageClickAny(answer.picture)}
                  />
                  {(currentUser.id.toString() ===
                    answer.user.userId.toString() ||
                    currentUser.role === "admin") && (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => handleOpenEditAnswer(answer)}
                        sx={{
                          margin: 2,
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleClickOnRemoveAnswer(answer.answerId.toString())
                        }
                        sx={{
                          margin: 2,
                        }}
                      >
                        Remove
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default QuestionPage;
