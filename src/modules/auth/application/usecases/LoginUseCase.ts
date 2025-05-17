import { IAuthService } from "../../domain/interfaces/IAuthService";
import { User } from "../../domain/entities/User";

export class LoginUseCase {
  constructor(private authService: IAuthService) {}

  async execute(email: string, password: string): Promise<User> {
    return this.authService.login(email, password);
  }
}
