import axios from "axios";

const questionApi = axios.create({
  baseURL: "http://localhost:8080/questions",
});

interface AddQuestionsInterface {
  userId: Number;
  title: string;
  description: string;
  picture: string;
}

interface VoteQuestionInterface {
  userId: string;
  questionId: string;
  value: number;
}

interface VoteAnswerInterface {
  userId: string;
  answerId: string;
  value: number;
}
questionApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token !== null ? `Bearer ${token}` : "";
  return config;
});

export const getAllQuestions = () => {
  return questionApi.get("/getAllSorted");
};

export const saveQuestion = ({
  userId,
  title,
  description,
  picture,
}: AddQuestionsInterface) => {
  return questionApi.post("/saveQuestion", {
    userId,
    title,
    description,
    picture,
  });
};

export const getQuestionById = (questionId: string) => {
  return questionApi.get(`/getById/${questionId}`);
};

export const deleteQuestionById = (questionId: string) => {
  return questionApi.delete(`/deleteById/${questionId}`);
};

export const updateQuestionById = (question: any) => {
  return questionApi.put("/updateQuestion", question);
};

export const voteQuestion = ({
  userId,
  questionId,
  value,
}: VoteQuestionInterface) => {
  return questionApi.patch("/voteQuestion", {
    userId,
    questionId,
    value,
  });
};

export const voteAnswer = ({
  userId,
  answerId,
  value,
}: VoteAnswerInterface) => {
  return questionApi.patch("/voteAnswer", {
    userId,
    answerId,
    value,
  });
};
