import { AuthModule } from '@/modules/auth/AuthModule';
import { IAuthService } from '@/modules/auth/domain/interfaces/IAuthService';
import { MockAuthRepository } from './mockAuthRepository';
import { MockTokenStorage } from './mockTokenStorage';

/**
 * Sets up a mocked AuthModule for testing
 * @returns The mocked repository instance for test assertions
 */
export function setupMockAuthModule() {
  // Reset the AuthModule to clear any previous state
  AuthModule.reset();
  
  // Create our mock instances
  const mockRepository = new MockAuthRepository();
  const mockTokenStorage = new MockTokenStorage();
  
  // Create a mock auth service that uses our repository
  const mockAuthService: IAuthService = {
    login: (email, password) => mockRepository.login(email, password),
    register: (userData) => mockRepository.register(userData),
    getCurrentUser: () => mockRepository.getCurrentUser(),
    logout: () => mockRepository.logout()
  };
  
  // Mock the auth module methods
  jest.spyOn(AuthModule, 'getAuthRepository').mockReturnValue(mockRepository);
  jest.spyOn(AuthModule, 'getTokenStorage').mockReturnValue(mockTokenStorage);
  jest.spyOn(AuthModule, 'getAuthService').mockReturnValue(mockAuthService);
  
  // Return the mock instances for assertions
  return { 
    mockRepository,
    mockTokenStorage,
    mockAuthService
  };
} 