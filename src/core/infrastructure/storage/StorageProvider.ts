import { IStorageService } from "../../domain/interfaces/IStorageService";
import { CookieStorageService } from "./CookieStorageService";
import { LocalStorageService } from "./LocalStorageService";

/**
 * Storage types supported by the provider
 */
export enum StorageType {
  COOKIE = "cookie",
  LOCAL_STORAGE = "localStorage",
}

/**
 * Provider for storage services
 * Acts as a factory for different storage implementations
 */
export class StorageProvider {
  private static instance: StorageProvider;
  private services: Map<StorageType, IStorageService>;

  private constructor() {
    this.services = new Map();
    this.services.set(StorageType.COOKIE, new CookieStorageService());
    this.services.set(StorageType.LOCAL_STORAGE, new LocalStorageService());
  }

  /**
   * Get the singleton instance of the provider
   * @returns The provider instance
   */
  static getInstance(): StorageProvider {
    if (!StorageProvider.instance) {
      StorageProvider.instance = new StorageProvider();
    }
    return StorageProvider.instance;
  }

  /**
   * Get a storage service by type
   * @param type Storage type
   * @returns The storage service
   * @throws Error if the storage type is not supported
   */
  getStorage(type: StorageType): IStorageService {
    const service = this.services.get(type);
    if (!service) {
      throw new Error(`Storage type ${type} is not supported`);
    }
    return service;
  }

  /**
   * Get the cookie storage service
   * @returns The cookie storage service
   */
  getCookieStorage(): IStorageService {
    return this.getStorage(StorageType.COOKIE);
  }

  /**
   * Get the localStorage service
   * @returns The localStorage service
   */
  getLocalStorage(): IStorageService {
    return this.getStorage(StorageType.LOCAL_STORAGE);
  }
}
