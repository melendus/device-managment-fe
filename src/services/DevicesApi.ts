import axios from "axios";
import { DeviceDto } from "../dtos/dtos";

const devicesApi = axios.create({
  baseURL: "http://localhost:8081/devices",
});

devicesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token !== null ? `Bearer ${token}` : "";
  return config;
});

export const getAllDevices = async () => {
  const response = await devicesApi.get("");
  return response.data;
};

export const createDevice = async (createDeviceDto: DeviceDto) => {
  return await devicesApi.post("", createDeviceDto);
};

export const updateDevice = async (
  deviceId: string,
  updateDeviceDto: DeviceDto
) => {
  return await devicesApi.put(`/${deviceId}`, updateDeviceDto);
};

export const deleteDevice = async (deviceId: string) => {
  return await devicesApi.delete(`/${deviceId}`);
};

export const getAllUserDevices = async (userId: string) => {
  return await devicesApi.get(`user-devices/${userId}`);
};
