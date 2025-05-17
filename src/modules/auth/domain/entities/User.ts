import { UserRole, UserStatus } from "../enums";

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly jobTitle: string | null = null,
    public readonly role: UserRole,
    public readonly status: UserStatus,
    public readonly createdAt: Date
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  isLead(): boolean {
    return this.role === UserRole.LEAD;
  }

  isMember(): boolean {
    return this.role === UserRole.MEMBER;
  }
}
