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
  userId: Number;

  firstName: string;
  lastName: string;
  role: string;
  createdAt?: Date;
  email: string;
  phoneNumber?: string;
  score?: number;
  banned?: boolean;
  votes?: [];
}

export interface QuestionTypeSearchBar {
  title: string;
  description: string;
  tags: TagType[];
  createdAt: string;
  updatedAt: string;
  creator: {
    id: Number;
    firstName: string;
    lastName: string;
    role: string;
    createdAt?: Date;
    email: string;
    phoneNumber?: string;
    score?: number;
    banned?: boolean;
    votes?: [];
  };
  id: number;
}
export interface TagType {
  id: Number;
  name: string;
}
