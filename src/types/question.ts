export interface AddReqBody {
  title: string;
  answers: Array<string>;
}
export interface AnswerReqBody {
  id: number;
  answer: string;
  userId: number;
}

export interface EditReqBody {
  id: number;
  title: string;
  answers: Array<string>;
}

export interface AddCategoryReqBody {
  id: number;
  name: string;
}
