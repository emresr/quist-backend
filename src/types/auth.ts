export interface SignupReqBody {
  email: string;
  password: string;
  name?: string;
}

export interface SigninReqBody {
  email: string;
  password: string;
}
