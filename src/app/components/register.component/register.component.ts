import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { RegisterService } from '../../services/user/register.service';
import { RegisterRequestDto } from '../../models/registerRequest.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule 
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private registerService=inject(RegisterService);
  private router = inject(Router);

registerData: RegisterRequestDto = {

    email: '',
    password: '',
    nome:'',
    cognome:''

  };

    errorMessage: string = '';
    onSubmit(): void {
    this.errorMessage = '';
    this.registerService.register(this.registerData).subscribe({
      next: (userCreato) => {
      console.log('Utente registrato con successo su db.json:', userCreato);
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error('Errore durante la registrazione:', err);
      this.errorMessage = "Errore non è stato possibile registrare l'utente";
    }
  });



}
}