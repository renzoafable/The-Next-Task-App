type Task = {
  _id: number;
  completed: boolean;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
};

type AuthUser = {
  age: number;
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type AuthUserPayload = {
  name: string;
  age: number;
  email: string;
  password: string;
};

type AuthLoginPayload = {
  email: string;
  password: string;
};

type AuthResponse = {
  user: AuthUser;
  token: string;
};
