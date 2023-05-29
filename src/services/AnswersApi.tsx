import axios from "axios";

interface CreateAnswer {
  title: string;
  description: string;
}

const answersApi = axios.create({
  baseURL: "http://localhost:8080/answers",
});

answersApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token !== null ? `Bearer ${token}` : "";
  return config;
});

export const getAllAnswersByQuestionId = (questionId: string) => {
  return answersApi.get(`getAllByQuestionId/${questionId}`);
};

export const addQuestionAnswer = (
  questionId: string,
  userId: string,
  answer: CreateAnswer
) => {
  return answersApi.post(`/addAnswer/${userId}/question/${questionId}`, answer);
};

export const deleteAnswerById = (answerId: string) => {
  return answersApi.delete(`deleteById/${answerId}`);
};

export const editAnswer = (answer: any) => {
  return answersApi.put("/updateAnswer", answer);
};
