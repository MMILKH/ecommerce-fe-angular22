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
      next: (utenti) => {
        if (utenti.length > 0) {
          console.log('Login effettuato con successo:', utenti[0]);
          if (utenti[0].ruolo ==='admin'){
            this.router.navigate(['/admin/user']);
          }
          else{
            this.router.navigate(['/products/catalog']);
          }
        } else {
          console.log('Email o password errate')
          this.errorMessage = 'Email o password errate.';
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Errore nella chiamata:', err);
        this.errorMessage = 'Impossibile effettuare il login.';
      }
    });
  }
}
