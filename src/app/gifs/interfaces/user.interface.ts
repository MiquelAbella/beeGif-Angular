export interface User {
  name: string;
  email: string;
  password: string;
  _id?: string;
  __v?: number;
}

export interface LoginResponse {
  ok: boolean;
  user: User;
}

export interface FormValues {
  email?: string | null | undefined;
  password?: string | null | undefined;
}
