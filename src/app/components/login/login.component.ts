import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService } from '../../services/user/login.service';
import { LoginRequest } from '../../models/loginRequest.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule 
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  loginData: LoginRequest = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  onSubmit(): void {

    this.errorMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        if (response.token) {
          console.log('Login effettuato con successo. Token salvato.');
          
          if (response.utente.ruolo!.nome === 'admin') {
            this.router.navigate(['/admin/user']);
          } else {
            this.router.navigate(['/products/catalog']);
          }
        }
      },
      error: (err) => {
        console.error('Errore nella chiamata di login:', err);
        if (err.status === 401 || err.status === 400) {
          this.errorMessage = 'Email o password errate.';
        } else {
          this.errorMessage = 'Impossibile effettuare il login, problema interno';
        }
        this.cdr.detectChanges();
      }
    });
  }
}
