import axios from "axios";

const voteAnswerApi = axios.create({
  baseURL: "http://localhost:8080/answerVotes",
});

voteAnswerApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token !== null ? `Bearer ${token}` : "";
  return config;
});

export const getAllVotesAnswer = (answerId: string) => {
  return voteAnswerApi.get(`/getAllVotes/${answerId}`);
};

export const getVoteAnswer = (userId: string, answerId: string) => {
  return voteAnswerApi.get(`/getVote/${userId}/${answerId}`);
};
