import { NavigationService } from "./application/services/NavigationService";

/**
 * Factory class for the Navigation Module following the Module Factory Pattern
 */
export class NavigationModule {
  private static instance: NavigationModule;
  private navigationService: NavigationService;

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {
    this.navigationService = new NavigationService();
  }

  /**
   * Get the singleton instance of NavigationModule
   */
  public static getInstance(): NavigationModule {
    if (!NavigationModule.instance) {
      NavigationModule.instance = new NavigationModule();
    }
    return NavigationModule.instance;
  }

  /**
   * Get the NavigationService instance
   */
  public getNavigationService(): NavigationService {
    return this.navigationService;
  }
}
