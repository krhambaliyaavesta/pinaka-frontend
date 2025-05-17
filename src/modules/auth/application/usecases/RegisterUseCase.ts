import { IAuthService } from "../../domain/interfaces/IAuthService";
import { RegisterUserDto } from "../../domain/interfaces/IAuthRepository";
import { User } from "../../domain/entities/User";

export class RegisterUseCase {
  constructor(private authService: IAuthService) {}

  async execute(userData: RegisterUserDto): Promise<User> {
    return this.authService.register(userData);
  }
}
