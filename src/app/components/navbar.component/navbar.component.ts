import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/user/login.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl:'./navbar.component.html'
   
})
export class NavbarComponent {
  public authService = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/user/login']);
  }
}
