export interface QuestionType {
  title: string;
  description: string;
  tags: TagType[];
  //TODO
  //change to Date
  createdAt: string;
  updatedAt: string;
  creator: UserType;
}

export interface AddQuestionType {
  title: string;
  description: string;
  picture: string;
}

export interface UserType {
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
}
export interface TagType {
  tagId: Number;
  name: string;
}
