import { computed, inject, Service, signal } from '@angular/core';
import { UserService } from './user-service';
import {
  PublicUserAccount,
  RegisterUser,
  StoredSession,
  UpdateProfileInput,
} from '../Model/user-account.model';
function loadSession(): StoredSession | null {
  const saved = localStorage.getItem('auth_token');
  if (saved === null) {
    return null;
  }
  try {
    const parsed = JSON.parse(saved) as StoredSession;
    if (parsed.expiresAt > Date.now()) {
      return parsed;
    }
  } catch {
    // Corrupted data in localStorage, fall back to null.
  }
  localStorage.removeItem('auth_token');
  return null;
}

@Service()
export class AuthService {
  readonly #userService = inject(UserService);
  readonly #session = signal<StoredSession | null>(loadSession());
  readonly currentUser = computed<PublicUserAccount | null>(() => {
    const session = this.#session();
    if (!session) {
      return null;
    }
    return this.#userService.getUser(session.userId) ?? null;
  });

  async login(email: string, password: string): Promise<boolean> {
    const user = await this.#userService.verifyCredentials(email, password);
    if (!user) {
      return false;
    }
    const session: StoredSession = { userId: user.id, expiresAt: Date.now() + 1000 * 60 * 10 };
    localStorage.setItem('auth_token', JSON.stringify(session));
    this.#session.set(session);
    return true;
  }

  async register(input: RegisterUser): Promise<boolean> {
    const success = await this.#userService.createCustomerAccount(input);
    if (!success) {
      return false;
    }
    return true;
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.#session.set(null);
  }

  isSessionValid() {
    const session = this.#session();
    if (!session) {
      return false;
    }
    if (session.expiresAt <= Date.now()) {
      this.logout();
      return false;
    }
    return true;
  }
  updateOwnProfile(input: UpdateProfileInput): boolean {
    const currentUser = this.currentUser();
    if (!currentUser) {
      return false;
    }
    return this.#userService.updateProfile(currentUser.id, input);
  }
}
