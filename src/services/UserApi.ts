import axios from "axios";
import { CreateUserDto, UserToUpdateDto } from "../dtos/dtos";

const userApi = axios.create({
  baseURL: "http://localhost:8080/users",
});

userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token !== null ? `Bearer ${token}` : "";
  return config;
});

export const getAllUsers = async () => {
  const response = await userApi.get("");
  return response.data;
};

export const updateUser = (
  userId: string,
  userToUpdateDto: UserToUpdateDto
) => {
  return userApi.put(`/${userId}`, userToUpdateDto);
};

export const removeUser = (userId: string) => {
  return userApi.delete(`/${userId}`);
};

export const createUser = async (createUserDto: CreateUserDto) => {
  return await userApi.post("", createUserDto);
};

export const removeUserAndDevices = async (userId: string) => {
  return await userApi.delete(`/devices/${userId}`);
};

export const findOneUser = async (userId: string) => {
  return await userApi.get(`/${userId}`);
};
