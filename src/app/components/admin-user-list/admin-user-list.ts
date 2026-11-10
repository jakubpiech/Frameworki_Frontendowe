import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  imports: [RouterLink],
  selector: 'app-admin-user-list',
  styleUrl: './admin-user-list.scss',
  templateUrl: './admin-user-list.html',
})
export class AdminUserList {
  readonly #auth = inject(AuthService);
  readonly currentUser = this.#auth.currentUser;
  readonly #userService = inject(UserService);
  readonly users = this.#userService.users;
  onDelete(id: string) {
    this.#userService.deleteAccount(id);
  }
  resetingId = signal<string | null>(null);
  startReset(id: string) {
    this.resetingId.set(id);
  }
  async onResetPassword(id: string, newPassword: string) {
    if (!newPassword) {
      return;
    }
    await this.#userService.resetPassword(id, newPassword);
    this.resetingId.set(null);
  }
}
