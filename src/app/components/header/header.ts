import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  readonly #auth= inject(AuthService);
  readonly #router = inject(Router);
  readonly currentUser = this.#auth.currentUser;

  onLogout() {
    this.#auth.logout();
    this.#router.navigate(['/restaurants']);
  }
}
