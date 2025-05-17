import { User } from "../entities/User";
import { RegisterUserDto } from "./IAuthRepository";

export interface IAuthService {
  login(email: string, password: string): Promise<User>;
  register(userData: RegisterUserDto): Promise<User>;
  getCurrentUser(): Promise<User | null>;
  logout(): Promise<void>;
}
