import { User } from "../entities/User";

export interface RegisterUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
}

export interface IAuthRepository {
  login(email: string, password: string): Promise<User>;
  register(userData: RegisterUserDto): Promise<User>;
  getCurrentUser(): Promise<User | null>;
  logout(): Promise<void>;
}
