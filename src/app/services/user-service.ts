import { Service, computed, effect, signal } from '@angular/core';
import { UserAccount } from '../Model/user-account.model';
import data from '../../data/users.json';
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
@Service()
export class UserService {
  readonly #users = signal<UserAccount[]>(loadUsers());
  readonly users = this.#users.asReadonly();
  readonly #persist = effect(() => {
    localStorage.setItem('users', JSON.stringify(this.#users()));
  });
  getUser(id: string) {}
  getUserList() {}
  isAdminLoggedIn() {}
}
