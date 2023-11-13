export interface CreateUserDto {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface UserToUpdateDto {
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
}

export interface DeviceDto {
  description?: string;
  address?: string;
  energyConsumptionPerHour?: number;
  userId?: number;
  name?: string;
}
