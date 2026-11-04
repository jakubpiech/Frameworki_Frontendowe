import { Service, computed, effect, signal } from '@angular/core';
import {
  CreateAdmin,
  PublicUserAccount,
  RegisterUser,
  UpdateProfileInput,
  UserAccount,
} from '../Model/user-account.model';
import data from '../../data/users.json';
import { hashPassword } from '../utils/hash-password';
function loadUsers(): UserAccount[] {
  const saved = localStorage.getItem('users');
  if (saved === null) {
    return data as UserAccount[];
  }
  try {
    const parsed: unknown = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      return parsed as UserAccount[];
    }
  } catch {
    // Corrupted data in localStorage, fall back to the JSON file.
  }
  return data as UserAccount[];
}
function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}
@Service()
export class UserService {
  readonly #users = signal<UserAccount[]>(loadUsers());
  readonly users = computed<PublicUserAccount[]>(() =>
    this.#users().map(({ passwordHash, ...publicAccount }) => publicAccount),
  );
  readonly #persist = effect(() => {
    localStorage.setItem('users', JSON.stringify(this.#users()));
  });

  getUser(id: string): PublicUserAccount | undefined {
    const userMatch = this.users().find((user) => user.id === id);
    return userMatch;
  }
  getUserList() {
    return this.users();
  }
  isAdminLoggedIn() {}

  async verifyCredentials(email: string, password: string): Promise<PublicUserAccount | undefined> {
    const normalizedEmail = normalizeEmail(email);
    const account = this.#users().find((user) => normalizeEmail(user.email) === normalizedEmail);
    if (!account) {
      return undefined;
    }
    const enteredHash = await hashPassword(password);
    if (enteredHash !== account.passwordHash) {
      return undefined;
    }
    return this.getUser(account.id);
  }
  async createCustomerAccount(input: RegisterUser): Promise<boolean> {
    const normalizedEmail = normalizeEmail(input.email);
    const account = this.#users().find((user) => normalizeEmail(user.email) === normalizedEmail);
    if (account) {
      return false;
    }
    const passwordHash = await hashPassword(input.password);
    const newAccount: UserAccount = {
      id: crypto.randomUUID(),
      name: input.name,
      role: 'customer',
      phone: input.phone,
      deliveryAddress: input.deliveryAddress,
      email: normalizedEmail,
      passwordHash,
    };
    this.#users.update((users) => [...users, newAccount]);
    return true;
  }
  async createAdminAccount(input: CreateAdmin): Promise<boolean> {
    const normalizedEmail = normalizeEmail(input.email);
    const account = this.#users().find((user) => normalizeEmail(user.email) === normalizedEmail);
    if (account) {
      return false;
    }
    const passwordHash = await hashPassword(input.password);
    const newAccount: UserAccount = {
      id: crypto.randomUUID(),
      name: input.name,
      role: 'admin',
      phone: input.phone,
      email: normalizedEmail,
      passwordHash,
    };
    this.#users.update((users) => [...users, newAccount]);
    return true;
  }
  updateProfile(id:string, input: UpdateProfileInput): boolean {
    const existingAccount = this.#users().find((user) => user.id === id);
    if (!existingAccount) {
      return false;
    }
    const emailMatch = normalizeEmail(input.email);
    const isEmailTaken = this.#users().some((user)=> user.id !== id && normalizeEmail(user.email) === emailMatch);
      if (isEmailTaken) {
        return false;
      }
    this.#users.update((users) =>
      users.map((user) => (user.id === id ? { ...user, ...input, email: emailMatch } : user)),
    );
    return true;
  }
  async resetPassword(id: string, newPassword: string): Promise<boolean> {
    const existingAccount = this.#users().find((user) => user.id === id);
    if (!existingAccount) {
      return false;
    }
    const passwordHash = await hashPassword(newPassword);
    this.#users.update((users) =>
      users.map((user) => (user.id === id ? { ...user, passwordHash } : user)),
    );
    return true;
  }
}
