import { IAuthService } from "../../domain/interfaces/IAuthService";

export class LogoutUseCase {
  constructor(private authService: IAuthService) {}

  async execute(): Promise<void> {
    return this.authService.logout();
  }
}
