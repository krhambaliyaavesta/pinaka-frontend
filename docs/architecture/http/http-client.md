# HTTP Client Architecture in Clean Architecture

This document outlines how the Pinaka frontend project abstracts Axios behind a clean HTTP client interface, following Clean Architecture principles.

## Core Abstraction Principles

The HTTP client abstraction follows these key principles:

1. **Dependency Inversion**: Core business logic depends on abstractions, not concrete implementations
2. **Interface Segregation**: Well-defined interfaces with focused responsibilities
3. **Loose Coupling**: Axios implementation details are isolated behind interfaces
4. **Testability**: All components can be easily tested with mock implementations

## Abstraction Layers

### 1. HTTP Client Interface

The foundation of the abstraction is the `HttpClient` interface:

```typescript
// src/core/infrastructure/http/HttpClient.ts

export interface HttpClient {
  get<T>(url: string, config?: HttpRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: HttpRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: HttpRequestConfig): Promise<T>;
  delete<T>(url: string, config?: HttpRequestConfig): Promise<T>;
  patch<T>(url: string, data?: any, config?: HttpRequestConfig): Promise<T>;
}

export interface HttpRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | null | undefined>;
  timeout?: number;
  // Additional generic configuration properties
}
```

### 2. Axios Implementation

The concrete implementation of the HTTP client interface using Axios:

```typescript
// src/core/infrastructure/http/AxiosHttpClient.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpClient, HttpRequestConfig } from "./HttpClient";
import { HttpError, NetworkError } from "../errors/HttpError";

export interface AxiosInterceptors {
  request?: {
    onFulfilled: (
      config: AxiosRequestConfig
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
    onRejected?: (error: any) => any;
  };
  response?: {
    onFulfilled?: (
      response: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>;
    onRejected?: (error: any) => any;
  };
}

export class AxiosHttpClient implements HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, interceptors?: AxiosInterceptors) {
    this.axiosInstance = axios.create({ baseURL });

    if (interceptors) {
      this.setupInterceptors(interceptors);
    }
  }

  async get<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        url,
        this.mapConfig(config)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(
    url: string,
    data?: any,
    config?: HttpRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        url,
        data,
        this.mapConfig(config)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T>(
    url: string,
    data?: any,
    config?: HttpRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(
        url,
        data,
        this.mapConfig(config)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(
        url,
        this.mapConfig(config)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: HttpRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.patch(
        url,
        data,
        this.mapConfig(config)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private mapConfig(config?: HttpRequestConfig): AxiosRequestConfig {
    if (!config) return {};
    // Map from generic HttpRequestConfig to Axios-specific config
    return config as AxiosRequestConfig;
  }

  private handleError(error: any): Error {
    // Network errors
    if (error.message === "Network Error") {
      return new NetworkError();
    }

    // Axios errors
    if (axios.isAxiosError(error)) {
      return new HttpError(
        error.response?.status || 500,
        error.response?.data?.message || error.message,
        error.response?.data
      );
    }

    // Unexpected errors
    return error;
  }

  private setupInterceptors(interceptors: AxiosInterceptors): void {
    // Request interceptors
    if (interceptors.request) {
      this.axiosInstance.interceptors.request.use(
        interceptors.request.onFulfilled,
        interceptors.request.onRejected
      );
    }

    // Response interceptors
    if (interceptors.response) {
      this.axiosInstance.interceptors.response.use(
        interceptors.response.onFulfilled,
        interceptors.response.onRejected
      );
    }
  }
}
```

### 3. Error Handling Abstraction

Domain-specific error classes that abstract Axios errors into application-specific errors:

```typescript
// src/core/infrastructure/http/errors/HttpError.ts

export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly data?: any
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export class NetworkError extends HttpError {
  constructor(message: string = "Network connection error") {
    super(0, message);
    this.name = "NetworkError";
  }
}

export class AuthenticationError extends HttpError {
  constructor(message: string = "Authentication failed") {
    super(401, message);
    this.name = "AuthenticationError";
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = "Resource not found") {
    super(404, message);
    this.name = "NotFoundError";
  }
}
```

### 4. HTTP Interceptors

Abstracting Axios interceptors for common tasks like authentication:

```typescript
// src/core/infrastructure/http/interceptors/AuthInterceptor.ts

import { AxiosRequestConfig } from "axios";
import { TokenService } from "../../auth/TokenService";

export class AuthInterceptor {
  constructor(private tokenService: TokenService) {}

  onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = this.tokenService.getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
}

// src/core/infrastructure/http/interceptors/ErrorInterceptor.ts

import { AxiosError } from "axios";
import { AuthenticationError } from "../errors/HttpError";

export class ErrorInterceptor {
  onError = (error: AxiosError): Promise<never> => {
    // Handle specific error scenarios
    if (error.response?.status === 401) {
      // Could trigger auth refresh or logout workflow
      return Promise.reject(new AuthenticationError());
    }

    return Promise.reject(error);
  };
}
```

## Directory Structure for HTTP Client Abstraction

```
src/
└── core/
    └── infrastructure/
        ├── http/
        │   ├── HttpClient.ts           // Interface defining HTTP operations
        │   ├── AxiosHttpClient.ts      // Axios implementation of HttpClient
        │   ├── interceptors/
        │   │   ├── AuthInterceptor.ts  // Authentication request interceptor
        │   │   └── ErrorInterceptor.ts // Error handling interceptor
        │   └── errors/
        │       ├── HttpError.ts        // Base HTTP error class
        │       └── NetworkError.ts     // Specific error types
        └── di/
            └── HttpClientProvider.ts   // Factory for creating HTTP clients
```

## Benefits of Axios Abstraction

1. **Implementation Independence**: The application depends on an abstract `HttpClient` interface, not on Axios directly

2. **Error Transformation**: Axios-specific errors are transformed into domain-specific errors

3. **Configuration Isolation**: Axios configuration details are encapsulated in the `AxiosHttpClient` implementation

4. **Interceptor Management**: Request/response interceptors are organized in a structured way

5. **Testing Simplicity**: Easy to create mock implementations of `HttpClient` for testing

6. **Adaptability**: Ability to replace Axios with another HTTP client library without changing consuming code

7. **Standardization**: Consistent interface for all HTTP operations across the application

By following this abstraction approach, the Pinaka frontend maintains clean separation of concerns and ensures that the core business logic remains independent of the specific HTTP client implementation.
