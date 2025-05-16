import { ToastService } from "./application/services/ToastService";
import { IToastService } from "./domain/interfaces/IToastService";
import { ToastPresenter } from "./infrastructure/presenters/ToastPresenter";
import { ToastRepository } from "./infrastructure/repositories/ToastRepository";

/**
 * Factory class for creating and managing toast module dependencies
 */
export class ToastModule {
  private static _instance: ToastModule;
  private _presenter: ToastPresenter | null = null;
  private _repository: ToastRepository | null = null;
  private _service: IToastService | null = null;

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {}

  /**
   * Gets the singleton instance of ToastModule
   */
  public static getInstance(): ToastModule {
    if (!ToastModule._instance) {
      ToastModule._instance = new ToastModule();
    }
    return ToastModule._instance;
  }

  /**
   * Gets or creates the toast presenter
   */
  public getPresenter(): ToastPresenter {
    if (!this._presenter) {
      this._presenter = new ToastPresenter();
    }
    return this._presenter;
  }

  /**
   * Gets or creates the toast repository
   */
  public getRepository(): ToastRepository {
    if (!this._repository) {
      this._repository = new ToastRepository();
    }
    return this._repository;
  }

  /**
   * Gets or creates the toast service
   */
  public getService(): IToastService {
    if (!this._service) {
      const presenter = this.getPresenter();
      this._service = new ToastService(presenter);
    }
    return this._service;
  }

  /**
   * Resets all module instances
   * Primarily used for testing
   */
  public reset(): void {
    this._presenter = null;
    this._repository = null;
    this._service = null;
  }
}
