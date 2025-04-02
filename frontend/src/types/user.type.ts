export type TUser = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export type TLoginUser = {
  _id: string
  name: string;
  photoUrl?: string;
  role: string;
  email: string;
  password: string;
};