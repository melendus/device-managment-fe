export interface QuestionType {
  title: string;
  description: string;
  tags: TagType[];
  //TODO
  //change to Date
  createdAt: string;
  updatedAt: string;
  creator: UserType;
  id: number;
}

export interface AddQuestionType {
  title: string;
  description: string;
  picture: string;
}

export interface AddAnswerType {
  title: string;
  description: string;
  picture: string;
}

export interface UserType {
  id: number;

  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

export interface TagType {
  id: Number;
  name: string;
}

export type OptionsRowButton = {
  optionName: string;
  optionLogo?: React.ReactElement;
  optionOnClick: (item: any) => void;
  isRed?: boolean;
  optionDisabled?: boolean;
};

export interface Device {
  name: string;
  id: number;
  description: string;
  address: string;
  energyConsumptionPerHour: number;
  userId: number;
}
