import axios from "axios";
import { TagType } from "../components/common/types/DataTypes";

interface AddTagInterface {
  name: string;
}

interface AddTagsInterface {
  tags: AddTagInterface[];
  questionId: number;
}

const tagApi = axios.create({
  baseURL: "http://localhost:8080/tags",
});

tagApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token !== null ? `Bearer ${token}` : "";
  return config;
});
export const addTags = async ({ tags, questionId }: AddTagsInterface) => {
  const myTags: TagType[] = [];

  for (const tag of tags) {
    const { data: tagResponse } = await tagApi.post(`/addTag/${questionId}`, {
      tag: {
        name: tag.name,
      },
    });
    myTags.push(tagResponse);
  }
  return myTags;
};
