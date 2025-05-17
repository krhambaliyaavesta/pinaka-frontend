// Module factory (main entry point)
export { AuthModule } from "./AuthModule";

// Domain exports (entities, interfaces, errors)
export { User } from "./domain/entities/User";
export { UserRole, UserStatus } from "./domain/enums";
export type { IAuthService, IAuthRepository, RegisterUserDto } from "./domain";
export {
  AuthError,
  InvalidCredentialsError,
  UserNotFoundError,
  RegistrationError,
  AuthorizationError,
} from "./domain/errors";

// Application exports (use cases)
export {
  LoginUseCase,
  RegisterUseCase,
  GetCurrentUserUseCase,
  LogoutUseCase,
} from "./application/usecases";

// Application hooks
export { useSignin, useSignup, useLogout, useAuth } from "./application/hooks";
