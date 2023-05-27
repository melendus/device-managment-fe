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

const creator: UserType = {
  id: Math.random() * 1000,
  firstName: "Stefan",
  lastName: "CEl mare",
  role: "user",
  createdAt: new Date(),
  email: "email@email.com",
};

const creator2: UserType = {
  id: Math.random() * 1000,
  firstName: "Ali",
  lastName: "Baba",
  role: "user",
  createdAt: new Date(),
  email: "email@email.com",
};

const creators = [creator, creator2];

const tags: TagType[] = [
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

const QuestionsPage = () => {
  const mockQuestion: QuestionType[] = [
    {
      title: "Question Title",
      tags: [
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
      ],
      createdAt: "Sun May 14 2023 20:36:37 ",
      updatedAt: "Sun May 14 2023 20:36:37 ",
      creator: creator,
      description: "CEVA",
    },
    {
      title: "Question Title",
      tags: [
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
      ],
      createdAt: "Sun May 14 2023 20:36:37 ",
      updatedAt: "Sun May 14 2023 20:36:37 ",
      creator: creator,
      description: "CEVA",
    },
    {
      title: "Question Title",
      tags: [
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
      ],
      createdAt: "Sun May 14 2023 20:36:37 ",
      updatedAt: "Sun May 14 2023 20:36:37 ",
      creator: creator,
      description: "CEVA",
    },
    {
      title: "Ali baba",
      tags: [
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
      ],
      createdAt: "Sun May 14 2023 20:36:37 ",
      updatedAt: "Sun May 14 2023 20:36:37 ",
      creator: creator,
      description: "CEVA",
    },
  ];

  const userArray: UserType[] = creators;

  const [questions, setQuestions] = useState([] as QuestionType[]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
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
      setLoading(false);
    };
    fetchQuestions();
  }, []);

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
      />
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SearchBarQuestions
              questions={questions}
              setCurrentQuestions={setFilteredQuestions}
              tags={tags}
              users={userArray}
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
