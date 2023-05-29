import axios from "axios";
import { TagType } from "../components/common/types/DataTypes";

interface AddTagInterface {
  name: string;
}

interface AddTagsInterface {
  tags: string[];
  questionId: number;
}

const tagApi = axios.create({
  baseURL: "http://localhost:8080/tags",
});

interface deleteAllTagsInterface {
  tagsIds: {
    id: string;
  }[];
  questionId: string;
}

tagApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token !== null ? `Bearer ${token}` : "";
  return config;
});
export const addTags = async ({ tags, questionId }: AddTagsInterface) => {
  const myTags: TagType[] = [];

  for (const tag of tags) {
    const { data: tagResponse } = await tagApi.post(`/addTag/${questionId}`, {
      name: tag,
    });
    myTags.push(tagResponse);
  }

  return myTags;
};

export const getTagsByQuestionId = async (questionId: string) => {
  return await tagApi.get(`/getTagsByQuestionId/${questionId}`);
};

export const getAllTags = async () => {
  return await tagApi.get("/getAll");
};

export const deleteAllQuestionTags = async ({
  tagsIds,
  questionId,
}: deleteAllTagsInterface) => {
  for (const tag of tagsIds) {
    const { data: tagResponse } = await tagApi.delete(
      `/deleteTag/${tag}/question/${questionId}`
    );
  }
};
