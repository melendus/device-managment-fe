import axios from "axios";

const voteQuestionApi = axios.create({
  baseURL: "http://localhost:8080/questionVotes",
});

voteQuestionApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token !== null ? `Bearer ${token}` : "";
  return config;
});

export const getAllVotes = (questionId: string) => {
  return voteQuestionApi.get(`/getAllVotes/${questionId}`);
};

export const getVote = (userId: string, questionId: string) => {
  return voteQuestionApi.get(`/getVote/${userId}/${questionId}`);
};
