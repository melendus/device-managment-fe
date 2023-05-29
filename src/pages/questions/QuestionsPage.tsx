import React, { useEffect, useState } from "react";
import SmallQuestion from "../../components/common/question/SmallQuestion";
import { BarLoader } from "react-spinners";
import colorConfigs from "../../configs/colorConfigs";
import {
  QuestionType,
  TagType,
  UserType,
} from "../../components/common/types/DataTypes";
import { Button, Grid, Paper } from "@mui/material";
import AddQuestionModal from "./AddQuestionModal";
import SearchBarQuestions from "../../components/common/tables/SearchBarQuestions";
import { getAllQuestions } from "../../services/QuestionApi";
import { getAllTags } from "../../services/TagApi";
import { getAllUsers } from "../../services/UserApi";

const creator: UserType = {
  userId: Math.random() * 1000,
  firstName: "Stefan",
  lastName: "CEl mare",
  role: "user",
  createdAt: new Date(),
  email: "email@email.com",
};

const creator2: UserType = {
  userId: Math.random() * 1000,
  firstName: "Ali",
  lastName: "Baba",
  role: "user",
  createdAt: new Date(),
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

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([] as QuestionType[]);
  const [filteredQuestions, setFilteredQuestions] = useState(
    [] as QuestionType[]
  );
  const [tags, setTags] = useState(mockTags);
  const [users, setUsers] = useState(creators);
  const [loading, setLoading] = useState(false);
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);

  const handleOpen = () => setIsAddQuestionModalOpen(true);
  const handleClose = () => setIsAddQuestionModalOpen(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const res = await getAllQuestions();
      setQuestions(res.data);
      setFilteredQuestions(res.data);
      const resTags = await getAllTags();
      setTags(resTags.data);

      const resUsers = await getAllUsers();
      console.log("users---->", resUsers.data);
      setUsers(resUsers.data);

      setLoading(false);
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    setFilteredQuestions(questions);
  }, [questions]);

  if (loading) {
    return (
      <div>
        <h3
          style={{
            position: "relative",
          }}
        >
          Please be patient! The questions are beeing fetched! :)
        </h3>
        <BarLoader
          color={colorConfigs.sidebar.bg}
          width={100}
          loading={loading}
          cssOverride={{
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "10px",
          }}
        />
      </div>
    );
  }

  return (
    <>
      <AddQuestionModal
        handleClose={handleClose}
        isOpen={isAddQuestionModalOpen}
        questions={questions}
        setQuestions={setQuestions}
      />
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SearchBarQuestions
              questions={questions}
              setCurrentQuestions={setFilteredQuestions}
              tags={tags}
              users={users}
            />
            <Grid
              item
              xs={12}
              md="auto"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button variant="contained" onClick={handleOpen}>
                Add Question
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {filteredQuestions.map((question: QuestionType, index) => (
              <SmallQuestion question={question} key={index} />
            ))}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default QuestionsPage;
