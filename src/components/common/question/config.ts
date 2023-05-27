export type Question = {
  title: string;
  creator: {
    firstName: string;
    lastName: string;
  };
  content: {
    description: string;
    createdAt: number;
  };
};
