import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-admin-user-list',
  styleUrl: './admin-user-list.scss',
  templateUrl: './admin-user-list.html',
})
export class AdminUserList {
  readonly #userService = inject(UserService);
  readonly users = this.#userService.users();
  onDelete(id:string){
    this.#userService.deleteAccount(id);
  }
  ressetingId = signal<string | null>(null);
  startReset(id:string){
    this.ressetingId.set(id);
  }
  async onResetPassword(id:string,newPassword:string){
    if(!newPassword){
      return;
    }
    await this.#userService.resetPassword(id,newPassword);
    this.ressetingId.set(null);
  }
}
