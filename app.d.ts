interface ITask {
  id: number;
  title: string;
  date: string;
  complete: boolean;
}

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

type AuthResponse = {
  user: AuthUser;
  token: string;
};
