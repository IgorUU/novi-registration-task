import type { User } from "./user";

export type AuthContextType = {
  user: User | null;
  login: (crendetials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
};

export type Credentials = {
  email: string;
  password: string;
}
