import axios from "axios";

const questionApi = axios.create({
  baseURL: "http://localhost:8080/questions",
});

interface AddQuestionsInterface {
  userId: number;
  title: string;
  description: string;
  picture: string;
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
